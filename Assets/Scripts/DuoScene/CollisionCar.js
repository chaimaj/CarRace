#pragma strict

 	private var checkpointPlayer : GameObject;
 	private var checkpointRival : GameObject;
 	
 	var rotationPlayer : float;
 	var rotationRival : float;
 	
 	var checkCounter : int ;
 	
 	function Start(){
 		rotationPlayer = gameObject.transform.rotation.y;
 	}
	
	function OnCollisionEnter(collision : Collision)
	{
		if(collision.gameObject.tag == "Rival")
		{
			Debug.Log("collision");
			if (checkCounter ==1){
				collision.gameObject.transform.position = checkpointRival.transform.position;
				gameObject.transform.position = checkpointPlayer.transform.position;
				gameObject.transform.rotation = Quaternion.Euler(gameObject.transform.rotation.x,264.5559,gameObject.transform.rotation.z);
				collision.transform.rotation = Quaternion.Euler(gameObject.transform.rotation.x,350.59,gameObject.transform.rotation.z);
				gameObject.rigidbody.isKinematic = true;
				collision.gameObject.rigidbody.isKinematic = true;
				yield StartCoroutine(WaitRespawn(2));
				gameObject.rigidbody.isKinematic = false;
				collision.gameObject.rigidbody.isKinematic = false;
			}
			if (checkCounter ==2){
				collision.gameObject.transform.position = checkpointRival.transform.position;
				gameObject.transform.position = checkpointPlayer.transform.position;
				gameObject.transform.rotation = Quaternion.Euler(gameObject.transform.rotation.x,161.968,gameObject.transform.rotation.z);
				collision.transform.rotation = Quaternion.Euler(gameObject.transform.rotation.x,247.968,gameObject.transform.rotation.z);
				gameObject.rigidbody.isKinematic = true;
				collision.gameObject.rigidbody.isKinematic = true;
				yield StartCoroutine(WaitRespawn(2));
				gameObject.rigidbody.isKinematic = false;
				collision.gameObject.rigidbody.isKinematic = false;
			}
			if (checkCounter ==3){
				collision.gameObject.transform.position = checkpointRival.transform.position;
				gameObject.transform.position = checkpointPlayer.transform.position;
				gameObject.transform.rotation = Quaternion.Euler(gameObject.transform.rotation.x,322.9898,gameObject.transform.rotation.z);
				collision.transform.rotation = Quaternion.Euler(gameObject.transform.rotation.x,48.9898,gameObject.transform.rotation.z);
				gameObject.rigidbody.isKinematic = true;
				collision.gameObject.rigidbody.isKinematic = true;
				yield StartCoroutine(WaitRespawn(2));
				gameObject.rigidbody.isKinematic = false;
				collision.gameObject.rigidbody.isKinematic = false;
			}
			if (checkCounter ==4){
				collision.gameObject.transform.position = checkpointRival.transform.position;
				gameObject.transform.position = checkpointPlayer.transform.position;
				gameObject.transform.rotation = Quaternion.Euler(gameObject.transform.rotation.x,355.6237,gameObject.transform.rotation.z);
				collision.transform.rotation = Quaternion.Euler(gameObject.transform.rotation.x,81.623,gameObject.transform.rotation.z);
				gameObject.rigidbody.isKinematic = true;
				collision.gameObject.rigidbody.isKinematic = true;
				yield StartCoroutine(WaitRespawn(2));
				gameObject.rigidbody.isKinematic = false;
				collision.gameObject.rigidbody.isKinematic = false;
			}		
			
		}
	}
	
	function OnTriggerEnter(other : Collider)
	{
		if(other.gameObject.tag == "checkPosition")
		{
			if(other.gameObject.name == "CheckPositionPlayer1")
			{
				checkCounter = 1 ;
				Debug.Log(checkCounter);
				checkpointPlayer = GameObject.Find("CheckPositionPlayer1");
				rotationPlayer = gameObject.transform.rotation.y;
				checkpointRival = GameObject.Find("CheckPositionRival1");
				rotationRival = GameObject.FindGameObjectWithTag("Rival").transform.rotation.y;
			}
			if(other.gameObject.name == "CheckPositionPlayer2")
			{
				checkCounter = 2 ;
				Debug.Log(checkCounter);
				checkpointPlayer = GameObject.Find("CheckPositionPlayer2");
				rotationPlayer = gameObject.transform.rotation.y;
				checkpointRival = GameObject.Find("CheckPositionRival2");
				rotationRival = GameObject.FindGameObjectWithTag("Rival").transform.rotation.y;
			}
			if(other.gameObject.name == "CheckPositionPlayer3")
			{
				checkCounter = 3 ;
				Debug.Log(checkCounter);
				checkpointPlayer = GameObject.Find("CheckPositionPlayer3");
				rotationPlayer = gameObject.transform.rotation.y;
				checkpointRival = GameObject.Find("CheckPositionRival3");
				rotationRival = GameObject.FindGameObjectWithTag("Rival").transform.rotation.y;
			}
			if(other.gameObject.name == "CheckPositionPlayer4")
			{
				checkCounter = 4 ;
				Debug.Log(checkCounter);
				checkpointPlayer = GameObject.Find("CheckPositionPlayer4");
				rotationPlayer = gameObject.transform.rotation.y;
				checkpointRival = GameObject.Find("CheckPositionRival4");
				rotationRival = GameObject.FindGameObjectWithTag("Rival").transform.rotation.y;
			}
		}	
	}

	function WaitRespawn (waitTime : float) {
		// suspend execution for waitTime seconds
		yield WaitForSeconds (waitTime);
	}