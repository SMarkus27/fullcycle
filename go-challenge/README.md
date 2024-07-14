# Go Challenge for FullCycle Course

## Overview

This repository contains a Go application developed as a part of the "Desafio Go" (Go Challenge) from the Docker module in the FullCycle 3.0 course.

## Challenge Requirements

- The Go application must display the message: "`FullCycle rocks!`"
- The resulting Docker image size must be under 2MB.

## Project Structure

- `main.go`: The Go source file that contains the application code.
- `go.mod`: Specifies the Go module name and version (_This project does not have any external dependencies_).
- `Dockerfile`: The Docker configuration file used to build the image.

## Instructions

To build and run this application, follow these steps:

### Building the Docker Image

```bash
docker build -t smarkus27/go-challenge .
``` 

This will create a Docker image named `smarkus27/go-challenge`.

#### Running the Docker Container

```bash
docker run --rm smarkus27/go-challenge
```

This command runs the container and outputs "`FullCycle rocks!!`" to the terminal.

## Image on Docker Hub

The production-ready version of this application's Docker image is available on [Docker Hub](https://hub.docker.com/r/smarkus27/go-challenge).

```bash
docker pull smarkus27/go-challenge
```

This command will download the latest version of the production image to the local machine.

> [!WARNING]  
> Please note that this image may be removed in case of inactivity. If that happens, we will need to build the production version locally using the Dockerfile.