var guiCountDown : GUIText;
var countMax : int;
private var countDown : int;

function Start(){

	guiCountDown.enabled=true;
	GameStart();
}

function GameStart(){
	var car = gameObject.Find("Car");

	var drivingScript = car.GetComponent("CarController");

	drivingScript.enabled=false;

	
	var timer = gameObject.GetComponent("TimerSolo");
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

    timer.enabled = true;
}