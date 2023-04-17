package com.miracle.AMAG.util.board;

import com.miracle.AMAG.util.image.ImageUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Slf4j
public class BoardUtils {
    public static final int PAGE_PER_ROW_5 = 5;
    public static final int PAGE_PER_ROW_20 = 20;

    public static final String ORDER_BY_ASC = "ASC";
    public static final String ORDER_BY_DESC = "DESC";

    public static final String SORT_BY_ID = "id";
    public static final String SORT_BY_VIEWS = "views";

    public static final boolean BOARD_DELETE_STATUS_FALSE = false;
    public static final boolean BOARD_DELETE_STATUS_TRUE = true;

    public static final String BOARD_CRUD_SUCCESS = "SUCCESS";

    public static final String BOARD_CRUD_FAIL = "FAIL";

    public static PageRequest pageRequestInit(int pageNum, int rowPerPage, String sortBy, String orderBy) {
        if (orderBy == BoardUtils.ORDER_BY_ASC) {
            return PageRequest.of(pageNum - 1, rowPerPage, Sort.by(sortBy));
        } else if (orderBy == BoardUtils.ORDER_BY_DESC) {
            return PageRequest.of(pageNum - 1, rowPerPage, Sort.by(sortBy).descending());
        }

        return null;
    }

    /**
     * 이미지 파일 확장자 검증
     * @param fileExtension
     * @return boolean
     */
    public static boolean checkImageFileExtension(String fileExtension) {
        List<String> extensions = Arrays.asList("jpg", "jpeg", "png", "gif");
        for (String extension: extensions) {
            if (fileExtension.toLowerCase().equals(extension)) {
                return true;
            }
        }

        throw new RuntimeException("파일 확장자가 일치하지 않습니다");
    }

    public static String singleFileSave(MultipartFile multipartFile) {
        try {
            // 원본 파일 이름
            String origFileName = multipartFile.getOriginalFilename();

            // 확장자
            String fileExtension = origFileName.substring(origFileName.lastIndexOf(".") + 1);
            BoardUtils.checkImageFileExtension(fileExtension);

            // 서버에 저장될 파일 이름
            String fileName = (LocalDateTime.now()).toString().replace(":", "-")
                    + "_" + (new Random().ints(1000, 9999).findAny().getAsInt())
                    + "." + fileExtension;

            // 파일 크기
            // long fileSize = multipartFile.getSize();

            File file = new File(ImageUtils.getImageUrl(), fileName);
            multipartFile.transferTo(file);

            log.debug(fileName + " 저장 완료");

            return fileName;
        } catch(Exception e) {
            throw new MultipartException("첨부파일 저장시 오류가 발생했습니다: " + e.getMessage());
        }
    }

    //    public static void multiFileSave(MultipartFile[] multipartFiles) {
//        for (MultipartFile multipartFile: multipartFiles) {
//            String fileName = singleFileSave(multipartFile);
//        }
//    }
}
