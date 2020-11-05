#pragma strict

var AICar : GameObject;
var Speed : float = 50;
var enginePower : float = 20;

function Start() {
	//This is where the script finds the AI car and plugs it into the variable of this script.
	AICar = GameObject.FindGameObjectWithTag("Rival");
}


// Hit the brakes when the AI enters the trigger
function OnTriggerEnter (other : Collider) {
if (other.gameObject.name=="RivalCar"){
	AICar.GetComponent.< AICarScript >().topSpeed = (Speed);
	AICar.GetComponent.< AICarScript >().maxTorque = (enginePower);
	}
}

function OnTriggerExit (other : Collider) {
if (other.gameObject.name=="RivalCar"){
	AICar.GetComponent.< AICarScript >().topSpeed = 100;
	AICar.GetComponent.< AICarScript >().maxTorque = 30;
}
}