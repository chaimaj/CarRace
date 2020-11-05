using UnityEngine;
using System.Collections;

public class Records : MonoBehaviour {

	private Color green= new Color(0.0F, 1.0F, 0.8F);
	public bool isback = false;
	void OnMouseEnter(){
	renderer.material.color = green;
	
	}
	void OnMouseExit(){
		renderer.material.color =Color.white;
	}
	void OnMouseDown(){
		if (isback)
		{
			Application.LoadLevel ("Menu");
		}
		else{
			PlayerPrefs.DeleteAll();
		}
}
}
