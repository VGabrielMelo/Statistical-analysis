
<div class="box">
  <img src="https://fatecsjc-prd.azurewebsites.net/images/logo/fatecsjc_400x192.png" width="420"> 
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/240px-Python.svg.png">
  <img src="https://images.tute.io/tute/topic/FastAPI.png" width="250">
</div>
<br>

# Statistical-analysis-Starlette
 ### Web application created to organize ways to statistically analyze a database (CSV, TXT, EXEL) by naming columns, metrics and plotting graphs.
 
 ### To start the project, first it is recommended to create a VENV on your machine, because if any library does something wrong, it is easier to be solved.
 
 ### Open your CMD and enter your project folder using the command below (Windows):
 
 **1°**
 ```
 cd <path-your-project>
 ```
 **2°**
 ```
 python -m venv <name-your-venv>
 ```
 **3°**
 ```
 <name-your-venv>\Scripts\activate.bat
 ```
 
 ### Ok, now just use pip and install all the dependencies of our project:
 
 ```
 pip install -r /path/to/requirements.txt
 ```
 
 ## Starting the application
 
 ### To start our application on this architecture, just open your venv and type the command:
 * --reload is the argument for the server to restart whenever there is any change
 ```
 uvicorn Server:app -- reload
 ```
