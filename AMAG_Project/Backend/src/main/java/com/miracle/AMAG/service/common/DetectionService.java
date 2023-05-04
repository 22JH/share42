package com.miracle.AMAG.service.common;

import ai.onnxruntime.OrtException;
import com.miracle.AMAG.dto.requestDTO.common.DetectionRequestDTO;
import com.miracle.AMAG.entity.common.Category;
import com.miracle.AMAG.mapping.common.CategoryMapping;
import com.miracle.AMAG.repository.common.CategoryRepository;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.yolo.Detection;
import com.miracle.AMAG.util.yolo.YoloV5;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.apache.tomcat.util.codec.binary.Base64;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DetectionService {

    private final YoloV5 inferenceSession;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    public DetectionService() throws OrtException, IOException {
        ClassPathResource yolCpr = new ClassPathResource("yolov5s.onnx");
        byte[] yoloResource = FileCopyUtils.copyToByteArray(yolCpr.getInputStream());
        ClassPathResource cocoCpr = new ClassPathResource("coco.names");
        this.inferenceSession = new YoloV5(yoloResource, cocoCpr,0.25f, 0.45f, -1);
    }

    public String detection(DetectionRequestDTO dto) throws OrtException, IOException {
        /*byte[] bytes = Base64.decodeBase64(imgData
                .replaceAll("data:image/png;base64,", "")
                .replaceAll("data:image/jpeg;base64,", "")
        );*/
        byte[] bytes = dto.getImgFile().getBytes();

        Mat img = Imgcodecs.imdecode(new MatOfByte(bytes), Imgcodecs.IMREAD_COLOR);

        List<Category> product = categoryRepository.findByCategory(dto.getCategory());

        List<Detection> result = inferenceSession.run(img);
        for (Detection d: result) {
            for (Category category : product) {
                if (d.label().equals(category.getProductName())) {
                    return BoardUtils.BOARD_CRUD_SUCCESS;
                }
            }
        }
        return BoardUtils.BOARD_CRUD_FAIL;
    }

    public List<CategoryMapping> getArticleCategory(){
        return categoryRepository.findDistinctBy();
    }
}
