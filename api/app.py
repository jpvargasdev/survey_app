from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
import json

app = FastAPI()


@app.get("/survey")
async def root():
    # filename = "questions.json"
    # file_path = f"./{filename}"
    # return FileResponse(file_path)
    with open("questions.json") as json_file:
        data = json.load(json_file)
        print(data)

    return JSONResponse(data)

