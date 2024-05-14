FROM openjdk:17
COPY pom.xml /tmp/
COPY src /tmp/src/
WORKDIR /tmp/
EXPOSE 8080
COPY target/javabot-0.0.1-SNAPSHOT.jar javabot.jar
ENTRYPOINT ["java","-jar","javabot.jar"]