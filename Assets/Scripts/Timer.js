var levelToLoad : String;
var pastTime : float;
var Wheels : WheelCollider[];
static var isFinished : boolean = false;
var guiTime : GUIText;
var highScore : GUIText;
var customSkin : GUISkin;
var showMoreGui = false; 
var isVisible = true; 
var showTextField = true;
var labelEnable = true;
function Update () {


for (var myWC : WheelCollider in Wheels){
var hit : WheelHit;
if (CarCheckpoint.currentCheckpoint==1 && CarCheckpoint.currentLap==2){
  isFinished = true;
  	var car = gameObject.Find("Car");
	var rivalcar = GameObject.FindGameObjectWithTag("Rival");
	var drivingScript = car.GetComponent("CarController");
	var drivingScriptai = rivalcar.GetComponent("AICarScript");
	var audio = car.GetComponent("AudioSource");
	audio.enabled=false;
	drivingScript.enabled=false;
	drivingScriptai.enabled=false;
	Time.timeScale=0;
 }
if(!isFinished) {
 pastTime += Time.deltaTime;
}
var minutes = Mathf.FloorToInt(pastTime / 60);
var seconds = Mathf.FloorToInt(pastTime - minutes * 60);
 
var niceTime = String.Format("{0:0}:{1:00}", minutes, seconds);
guiTime.text = "Time\n"+niceTime.ToString();
}
}


function Awake() {
 highScore.text = "Best Time\nTime: "+ PlayerPrefs.GetFloat("BestTime001")+"\nName: " +PlayerPrefs.GetString("PlayerName") ;
}

function OnGUI() { 
 GUI.skin = customSkin;
 if(isFinished)  {
  var bestTime : float = 9999.99;
    var bestPlayer : String = "Player";
  if (PlayerPrefs.HasKey("BestTime001")) {
  bestTime = PlayerPrefs.GetFloat("BestTime001");
  }
  if(PlayerPrefs.HasKey("PlayerName")) {
 bestPlayer=PlayerPrefs.GetString("PlayerName");
 }

  if (pastTime <= bestTime) {
   PlayerPrefs.SetFloat("BestTime001", pastTime);
   if(labelEnable){
    GUI.Label(new Rect(150,60,1000,50),"Congratulations! You completed the race in " + pastTime +" seconds, which is a new record!");
    GUI.Label(new Rect(300,90,1000,50),"Please enter your name below:");
    }
    if(showTextField == true){
    bestPlayer = GUI.TextField (Rect (350,120, 200, 50), bestPlayer, 25);
    PlayerPrefs.SetString("PlayerName",bestPlayer);   
    if (Event.current.keyCode == KeyCode.Return) {
     showTextField=false;
     //labelEnable = false; 
  }
  }
  }
   else {
    if(labelEnable)
     GUI.Label(new Rect(150,60,1000,50),"Congratulations! You completed the race in " + pastTime +" seconds!");
  }  

  if(isVisible){
  if(GUI.Button(Rect(350,150,300,50),"OK")){
   showMoreGui = true;
   isVisible = false;
   labelEnable = false; 
   }
  }
  if (showMoreGui) { 
   if(GUI.Button(Rect(350,150,300,50),"TO MENU")){
   Time.timeScale=1;
    Application.LoadLevel("Menu");  
    isFinished = false;
    }
   if(GUI.Button(Rect(350,220,300,50),"PLAY AGAIN")) {
   Time.timeScale=1;
    isFinished = false;
    Application.LoadLevel(levelToLoad); }
   if(GUI.Button(Rect(350,290,300,50),"EXIT TO WINDOWS"))
    Application.Quit();
  }
 }
}