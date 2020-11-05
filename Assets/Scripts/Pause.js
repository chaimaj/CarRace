#pragma strict

var pause : boolean = false;
var customSkin : GUISkin;
var levelToLoad : String;

function Update(){
if(Input.GetKeyUp(KeyCode.Escape)) {
if(pause==true){
pause = false;
}
else {
pause = true;
} if(pause == true) {
Time.timeScale = 0.0;

}
else {
Time.timeScale = 1.0;

}
} 
}

function OnGUI(){
if (pause){
GUI.skin = customSkin;

 if(GUI.Button(Rect(350,150,300,50),"TO MENU")){
 Time.timeScale=1.0;
    Application.LoadLevel("Menu");
     
   	
    }
   if(GUI.Button(Rect(350,220,300,50),"PLAY AGAIN")) {
   Time.timeScale=1.0;
  Application.LoadLevel(levelToLoad);
}
   if(GUI.Button(Rect(350,290,300,50),"EXIT TO WINDOWS"))
    Application.Quit();
  }
 
}

