FROM openjdk:17

WORKDIR /app

COPY build/libs/*.jar app.jar

EXPOSE 8088

ENTRYPOINT ["java", "-jar", "app.jar"]