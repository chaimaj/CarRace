using UnityEngine;
using System.Collections;

public class PickUp : MonoBehaviour {
	
	public int CoinValue;
	public GameObject CoinParticule;
	
	private bool _triggered;
	private AudioSource _audioSource;
	
	void Awake(){
		CoinValue = 1;
		_audioSource = gameObject.GetComponent<AudioSource>();
	}

	// Update is called once per frame
	void Update () {
	if (_triggered && !_audioSource.isPlaying)
			Destroy(gameObject);
		
	}
	
	void OnTriggerEnter(){
	_triggered =true;
	_audioSource.enabled=true;
	GameManager.PickUpCount += CoinValue;	
	gameObject.GetComponent<MeshRenderer>().enabled = false;
	
		Instantiate(CoinParticule, gameObject.transform.position, Quaternion.LookRotation(Vector3.up));
	
	}
	
	
}
