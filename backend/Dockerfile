FROM openjdk:23-jdk-slim

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

EXPOSE 8080

COPY target/*.jar backend.jar

ENTRYPOINT ["java", "-jar", "/app/backend.jar"]