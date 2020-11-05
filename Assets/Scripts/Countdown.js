var guiCountDown : GUIText;
var countMax : int;
private var countDown : int;

function Start(){

	guiCountDown.enabled=true;
	GameStart();
}

function GameStart(){
	var car = gameObject.Find("Car");
	var rivalcar = GameObject.FindGameObjectWithTag("Rival");
	var drivingScript = car.GetComponent("CarController");
	var drivingScriptai = rivalcar.GetComponent("AICarScript");
	drivingScript.enabled=false;
	drivingScriptai.enabled=false;
	
	var timer = gameObject.GetComponent("Timer");
	timer.enabled = false;
	
	for (countDown = countMax; countDown>-1;countDown--){
	    if(countDown == 0) {
	    guiCountDown.text = "GO!";
	    } 
	    else
		guiCountDown.text = countDown.ToString();
		yield WaitForSeconds(1);
	}

	
	guiCountDown.enabled=false;
	drivingScript.enabled=true;
	drivingScriptai.enabled=true;
    timer.enabled = true;
}