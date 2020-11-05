var centerOfMass : Vector3;
var path : Array;
var pathGroup : Transform;
var maxSteer : float =15.0;
var wheelFL : WheelCollider;
var wheelFR : WheelCollider;
var wheelBL : WheelCollider;   
var wheelBR : WheelCollider; 
var currentPathObj : int;
var distFromPath : float = 20;
var maxTorque : float = 50;  
var currentSpeed : float;  
var topSpeed : float = 50;  
var decellarationSpeed : float = 10;  


function Start () {
	rigidbody.centerOfMass = centerOfMass;
	GetPath();

}
function GetPath(){
	var path_objs : Array = pathGroup.GetComponentsInChildren(Transform);
	path = new Array();
	for (var path_obj : Transform in path_objs){
		if (path_obj != pathGroup)
			path[path.length] = path_obj;

}


}

function Update () {
	GetSteer();
	Move();
}

function GetSteer(){
	var steerVector : Vector3 = transform.InverseTransformPoint(Vector3(path[currentPathObj].position.x,transform.position.y,path[currentPathObj].position.z));
	var newSteer : float = maxSteer * (steerVector.x / steerVector.magnitude);
	wheelFL.steerAngle = newSteer;
	wheelFR.steerAngle = newSteer;
	if (steerVector.magnitude <= distFromPath){  
		currentPathObj++;  
	if (currentPathObj >= path.length)  
		currentPathObj = 0;  
}  
  
}  
  
function Move (){  
	currentSpeed = 2*(22/7)*wheelBL.radius*wheelBL.rpm * 60 / 1000;  
	currentSpeed = Mathf.Round (currentSpeed);  
	if (currentSpeed <= topSpeed){  
		wheelBL.motorTorque = maxTorque;  
		wheelBR.motorTorque = maxTorque;  
		wheelBL.brakeTorque = 0;  
		wheelBR.brakeTorque = 0;  
}  
else {  
	wheelBL.motorTorque = 0;  
	wheelBR.motorTorque = 0;  
	wheelBL.brakeTorque = decellarationSpeed;  
	wheelBR.brakeTorque = decellarationSpeed;  
}  
}  