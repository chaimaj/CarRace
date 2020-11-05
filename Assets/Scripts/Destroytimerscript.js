#pragma strict
var destroyAfter : float =1;
private var timer : float;
function Start () {

}

function Update () {
timer +=Time.deltaTime;
if (destroyAfter <= timer){
Destroy (gameObject);
}
}