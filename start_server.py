#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def start_server():
    global PORT
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"服务器启动成功！")
            print(f"本地地址: http://localhost:{PORT}")
            print(f"网络地址: http://127.0.0.1:{PORT}")
            print("按 Ctrl+C 停止服务器")
            
            # 不在服务端自动打开浏览器，避免与批处理重复打开
            # webbrowser.open(f'http://localhost:{PORT}')
            
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 10048:  # Windows端口被占用错误
            print(f"端口 {PORT} 已被占用，尝试使用端口 {PORT+1}")
            PORT = PORT + 1
            start_server()
        else:
            # 兼容其他系统返回不同 errno 的情况，遇到端口占用同样递增重试
            try:
                import errno
                if getattr(e, "errno", None) in (errno.EADDRINUSE,):
                    print(f"端口 {PORT} 已被占用，尝试使用端口 {PORT+1}")
                    PORT = PORT + 1
                    start_server()
                    return
            except Exception:
                pass
        else:
            print(f"启动服务器时出错: {e}")
            sys.exit(1)
    except KeyboardInterrupt:
        print("\n服务器已停止")
        sys.exit(0)

if __name__ == "__main__":
    # 切换到脚本所在目录
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    start_server()