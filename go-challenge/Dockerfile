FROM golang:1.21.4 AS builder

WORKDIR /app

COPY . .

RUN go build main.go

FROM scratch

WORKDIR /app

COPY --from=builder /app/main .

CMD [ "./main" ]