#pragma strict
var wheelFL : WheelCollider;
var wheelFR : WheelCollider;
var wheelBL : WheelCollider;
var wheelBR : WheelCollider;
var wheelFLTrans : Transform;
var wheelFRTrans : Transform;
var wheelBLTrans : Transform;
var wheelBRTrans : Transform;

var music : GameObject;
var lowestSteerAtSpeed : float= 30;
var lowSpeedSteerAngle : float = 10;
var highSpeedSteerAngle : float = 30;
var currentSpeed : float = 0;
var topSpeed : float = 150;
var maxReverseSpeed : float = 50;
var backLightObject : GameObject;
var LightOn : Material;
var LightOff : Material;
var maxTorque = 30;
var turning = 20;
var breaking = 30;
var braked : boolean =false;
var handbreak =100;
var gearRatio : int[];

var GUISpeed : GUIText;

private var mySidewayFriction : float;
private var myForwardFriction : float;
private var slipSidewayFriction : float;
private var slipForwardFriction : float;




function Start () {
music.GetComponent(AudioSource).Play();
rigidbody.centerOfMass.y= -1.5;
rigidbody.centerOfMass.z= 0.5;
SetValues();
}

function SetValues (){

myForwardFriction  = wheelBR.forwardFriction.stiffness;
mySidewayFriction  = wheelBR.sidewaysFriction.stiffness;
slipForwardFriction = 0.05;
slipSidewayFriction = 0.085;

}
function FixedUpdate (){
Controle ();
HandBrake();
}
function Controle () {

//*******make the car move
// calculate current speed 
currentSpeed = 2* 22/7*wheelBL.radius*wheelBL.rpm* 60/1000;
currentSpeed = Mathf.Round(currentSpeed);
GUISpeed.text = "Speed \n"+currentSpeed.ToString();
//not exceed the top speed
if (currentSpeed <topSpeed && currentSpeed > - maxReverseSpeed && !braked){
wheelBR.motorTorque = Input.GetAxis ("Vertical")* maxTorque;
wheelBL.motorTorque = Input.GetAxis ("Vertical")* maxTorque;
}
else{
wheelBR.motorTorque = 0;
wheelBL.motorTorque = 0;

}

var speedFacor = rigidbody.velocity.magnitude/lowestSteerAtSpeed;
var currentSteerAngle =Mathf.Lerp(lowSpeedSteerAngle,highSpeedSteerAngle,speedFacor);
currentSteerAngle *= Input.GetAxis ("Horizontal");
wheelBL.brakeTorque =0;
wheelBR.brakeTorque =0;
wheelFL.steerAngle = currentSteerAngle;
wheelFR.steerAngle = currentSteerAngle;
//wheelFL.steerAngle = Input.GetAxis("Horizontal")*turning;
//wheelFR.steerAngle = Input.GetAxis("Horizontal")*turning;

// make the car stop
if (Input.GetButton("Vertical")==false) {
	wheelBL.brakeTorque = breaking;
	wheelBR.brakeTorque = breaking;
	
}
}
function Update(){

//Rotation of the wheels
wheelFLTrans.Rotate(0,0,wheelFL.rpm/60*360*Time.deltaTime);
wheelFRTrans.Rotate(0,0,wheelFR.rpm/60*360*Time.deltaTime);
wheelBLTrans.Rotate(0,0,wheelBL.rpm/60*360*Time.deltaTime);
wheelBRTrans.Rotate(0,0,wheelBR.rpm/60*360*Time.deltaTime);
// make the wheels rotate right and left
wheelFRTrans.localEulerAngles.y = wheelFR.steerAngle -wheelFRTrans.localEulerAngles.x;
wheelFLTrans.localEulerAngles.y = wheelFL.steerAngle -wheelFLTrans.localEulerAngles.x;
BackLight();
WheelPosition();
ReverseSlip();
EngineSound();
}

function BackLight () {
if (currentSpeed > 0 && Input.GetAxis("Vertical")<0 ){
	backLightObject.renderer.materials[5] = LightOn;
}
else {
	backLightObject.renderer.materials[5] = LightOff;
}
}

function WheelPosition(){
var hit : RaycastHit;
var wheelPos : Vector3;
if (Physics.Raycast(wheelFL.transform.position, -wheelFL.transform.up, hit,wheelFL.radius+wheelFL.suspensionDistance )){
	wheelPos = hit.point+wheelFL.transform.up * wheelFL.radius;
}
else {
	wheelPos = wheelFL.transform.position -wheelFL.transform.up *wheelFL.suspensionDistance;
}
wheelFLTrans.position= wheelPos;

if (Physics.Raycast(wheelFR.transform.position, -wheelFR.transform.up, hit,wheelFR.radius+wheelFR.suspensionDistance )){
	wheelPos = hit.point+wheelFR.transform.up * wheelFR.radius;
}
else {
	wheelPos = wheelFR.transform.position -wheelFR.transform.up *wheelFR.suspensionDistance;
}
wheelFRTrans.position= wheelPos;

if (Physics.Raycast(wheelBL.transform.position, -wheelBL.transform.up, hit,wheelBL.radius+wheelBL.suspensionDistance )){
	wheelPos = hit.point+wheelBL.transform.up * wheelBL.radius;
}
else {
	wheelPos = wheelBL.transform.position -wheelBL.transform.up *wheelBL.suspensionDistance;
}
wheelBLTrans.position= wheelPos;

if (Physics.Raycast(wheelBR.transform.position, -wheelBR.transform.up, hit,wheelBR.radius+wheelBR.suspensionDistance )){
	wheelPos = hit.point+wheelBR.transform.up * wheelBR.radius;
}
else {
	wheelPos = wheelBR.transform.position -wheelBR.transform.up *wheelBR.suspensionDistance;
}
wheelBRTrans.position= wheelPos;
}

function HandBrake(){
if (Input.GetButton("Jump")){
braked = true;
}
else{
braked = false;
}
if (braked){
if (currentSpeed > 1){
wheelFR.brakeTorque = handbreak;
wheelFL.brakeTorque = handbreak;
wheelBR.motorTorque =0;
wheelBL.motorTorque =0;
SetRearSlip(slipForwardFriction ,slipSidewayFriction); 
}
else if (currentSpeed < 0){
wheelBR.brakeTorque = handbreak;
wheelBL.brakeTorque = handbreak;
wheelBR.motorTorque =0;
wheelBL.motorTorque =0;
SetRearSlip(1 ,1); 
}
else {
SetRearSlip(1 ,1); 
}
if (currentSpeed < 2 && currentSpeed > -2){
backLightObject.renderer.materials[5] = LightOn;
}
else {
backLightObject.renderer.materials[5] = LightOff;
}
}
else {
wheelFR.brakeTorque = 0;
wheelFL.brakeTorque = 0;
SetRearSlip(myForwardFriction ,mySidewayFriction); 
}

}

function ReverseSlip(){

if (currentSpeed <0){

SetRearSlip(slipForwardFriction ,slipSidewayFriction); 

}

else {

SetFrontSlip(myForwardFriction ,mySidewayFriction);

}
}

function SetRearSlip (currentForwardFriction : float,currentSidewayFriction : float){

wheelBR.forwardFriction.stiffness = currentForwardFriction;
wheelBL.forwardFriction.stiffness = currentForwardFriction;
wheelBR.sidewaysFriction.stiffness = currentSidewayFriction;
wheelBL.sidewaysFriction.stiffness = currentSidewayFriction;

}

function SetFrontSlip (currentForwardFriction : float,currentSidewayFriction : float){

wheelFR.forwardFriction.stiffness = currentForwardFriction;
wheelFL.forwardFriction.stiffness = currentForwardFriction;
wheelFR.sidewaysFriction.stiffness = currentSidewayFriction;
wheelFL.sidewaysFriction.stiffness = currentSidewayFriction;

}

function EngineSound(){
for (var i =0;i<gearRatio.length;i++){
if (gearRatio[i]> currentSpeed){
break;
}

var gearMinValue : float =0.00;
var gearMaxValue : float =0.00; 
if (i==0){
gearMinValue =0;
gearMaxValue = gearRatio[i];
}
else{
gearMinValue =gearRatio[i-1];
gearMaxValue = gearRatio[i];
}
var enginePitch : float = ((currentSpeed - gearMinValue)/(gearMaxValue -gearMinValue))+1;
audio.pitch = enginePitch ;
}
}