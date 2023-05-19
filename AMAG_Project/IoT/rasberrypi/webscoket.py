import websockets
import asyncio
import serial
import cv2
import json
import numpy
import base64
from asyncio import Queue

SERVER_URL = "www.share42-together.com"
#SERVER_URL = "192.168.45.145"
PROTOCOL = "wss" # ws / wss

####################################
####### cam location ##############
###################################
#capture1 = cv2.VideoCapture(1)   #
#capture2 = cv2.VideoCapture(2)   #
##################################


########### encoding qultiy#######################
encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
################################################
###########################################


######### cam qulity setting ##############
############################################
#capture1.set(cv2.CAP_PROP_FRAME_WIDTH, 640)#
#capture1.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)#
#############################################

########### cam check###########

#if not capture2.isOpened():
#    print('cam2 connect fail')
#    exit()
#################################
    
    
#box1 = serial.Serial(port = "/dev/ttyAMA0",
#                    baudrate = 9600,
#                    bytesize = serial.EIGHTBITS,
#                    parity = serial.PARITY_NONE,
#                    timeout =1)

#box2 = serial.Serial(port = "/dev/ttyACM0",
#                   baudrate = 9600,
#                    bytesize = serial.EIGHTBITS,
#                    parity = serial.PARITY_NONE,
#                    timeout =1)

async def serial_task(serial_queue: Queue, websocket_queue: Queue):
    box1 = serial.Serial(port = "/dev/ttyACM0",
                    baudrate = 9600,
                    bytesize = serial.EIGHTBITS,
                    parity = serial.PARITY_NONE,
                    timeout =1)    
#    box2 = serial.Serial(port = "/dev/ttyACM1",
#                       baudrate = 9600,
#                        bytesize = serial.EIGHTBITS,
#                        parity = serial.PARITY_NONE,
#                        timeout =1)
    
    while 1:
        ardRes1 = box1.readline().decode('utf-8').strip()
#        ardRes2 = box2.readline().decode('utf-8').strip()
        
        if ardRes1:
            
            split_res1 = ardRes1.split()
            object1 = json.dumps({
                'number' : int(split_res1[0]),
                'command' : split_res1[1],
                'weight' : int(split_res1[2]),
                'cam' : None,
            })
            print(object1)
            await websocket_queue.put(object1)
        else:
            await websocket_queue.put(ardRes1)
        await asyncio.sleep(0.1)
        
        if not serial_queue.empty():
            value_to_send = await serial_queue.get()
            
            if value_to_send == '1 open':                
                box1.write(value_to_send.encode())
            elif value_to_send == '2 open':
                box1.write(value_to_send.encode())
                
async def websocket_task(url: str, websocket_queue: Queue, serial_queue: Queue):
    async with websockets.connect(url, max_size=2048576) as websocket:
        asyncio.create_task(consume_queue(websocket, websocket_queue))
        
        while 1:
            res = await websocket.recv()
            print('from websocket', res)
            if res == '1 open':
                await serial_queue.put(res)
                
            elif res == '1 cam':
                capture1 = cv2.VideoCapture(0)
                ret1, frame1 = capture1.read()
                
                if not capture1.isOpened():
                    print('cam1 connect fail')
                    exit()
                
                result1, img_encode1 = cv2.imencode('.jpg', frame1, encode_param)
                data1 = numpy.array(img_encode1)
                stringData1 = base64.b64encode(data1)
                cam_data1 = json.dumps({
                    'number' : 1,
                    'command' : "cam",
                    'weight' : 0,
                    'cam' : stringData1.decode('utf8'),
                })
                capture1.release()

                await websocket_queue.put(cam_data1)
                
            elif res == '2 open':
                await serial_queue.put(res)
                
            elif res == '2 cam':
                
                capture2 = cv2.VideoCapture(1)
                ret2, frame2 = capture2.read()
                
                if not capture2.isOpened():
                    print('cam2 connect fail')
                    exit()
                
                result2, img_encode2 = cv2.imencode('.jpg', frame2, encode_param)
                data2 = numpy.array(img_encode2)
                stringData2 = base64.b64encode(data2)
                cam_data2 = json.dumps({
                    'number' : 2,
                    'command' : "cam",
                    'weight' : 0,
                    'cam' : stringData2.decode('utf8'),
                })
                capture1.release()

                await websocket_queue.put(cam_data2)
                
async def consume_queue(websocket, queue:Queue):
    while 1:
        line = await queue.get()
        if line:
            await websocket.send(line)

async def main():
    websocket_queue = Queue()
    serial_queue = Queue()
    url = "wss://www.share42-together.com:8088/ws/locker"
    
    task1 = asyncio.create_task(serial_task(serial_queue, websocket_queue))
    task2 = asyncio.create_task(websocket_task(url, websocket_queue, serial_queue))
    
    await asyncio.gather(task1, task2)
    
asyncio.run(main())
    