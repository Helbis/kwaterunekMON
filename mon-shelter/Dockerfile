#
# Build stage
#
FROM maven:3-amazoncorretto-17 AS build
COPY . .
RUN mvn clean package -DskipTests

#
# Package stage
#
FROM openjdk:21-ea-17-slim-buster
COPY --from=build /target/mon-shelter-0.1.0.jar mon-shelter.jar
# ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","mon-shelter.jar"]