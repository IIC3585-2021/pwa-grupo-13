from http.server import HTTPServer, SimpleHTTPRequestHandler, HTTPStatus
import ssl

httpd = HTTPServer(('localhost', 443), SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket, server_side=True, certfile='./fakeduck.pem')
httpd.serve_forever()
