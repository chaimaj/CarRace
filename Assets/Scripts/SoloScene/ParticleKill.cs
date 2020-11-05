using UnityEngine;
using System.Collections;

public class ParticleKill : MonoBehaviour {

	
	
	// Update is called once per frame
	void Update () {
		if (!gameObject.GetComponent<ParticleSystem>().isPlaying)
			Destroy (gameObject);
	
	}
}
