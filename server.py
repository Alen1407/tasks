import os
import socket


def handle_client(client_socket):
    request_data = client_socket.recv(1024).decode()

    filename = request_data.split()[1][1:]

    if not os.path.isfile(filename):
        response = "HTTP/1.1 404 Not Found\r\n\r\n"
    else:
        with open(filename, 'r') as file:
            file_content = file.read()
        response = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n" + file_content

    client_socket.sendall(response.encode())
    client_socket.close()


def main():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    server_address = ('127.0.0.1', 8080)
    server_socket.bind(server_address)

    server_socket.listen(5)
    print("Server started. Listening on http://{}:{}".format(*server_address))

    while True:
        for_client_socket, client_address = server_socket.accept()
        print("Accepted connection from:", client_address)
        handle_client(for_client_socket)


if __name__ == "__main__":
    main()
