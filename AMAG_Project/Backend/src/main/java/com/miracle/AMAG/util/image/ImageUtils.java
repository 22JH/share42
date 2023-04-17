package com.miracle.AMAG.util.image;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ImageUtils {
    public static String imageUrlLinux;
    public static String imageUrlWindows;

    @Value("${image.url.linux}")
    private void setImageUrlLinux(String imageUrl) {
        ImageUtils.imageUrlLinux = imageUrl;
    }

    @Value("${image.url.windows}")
    private void setImageUrlWindows(String imageUrl) {
        ImageUtils.imageUrlWindows = imageUrl;
    }

    public static String getImageUrl(String fileName) {
        return String.format("%s/%s.png", ImageUtils.getImageUrl(), fileName);
    }

    public static String getImageUrl() {
        String imageUrl = "";
        String osInfo = System.getProperty("os.name").toLowerCase();

        if (osInfo.contains("win")) {
            imageUrl = imageUrlWindows;
        } else if (osInfo.contains("linux")) {
            imageUrl = imageUrlLinux;
        }

        return imageUrl;
    }
}
