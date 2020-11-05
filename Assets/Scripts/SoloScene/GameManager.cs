using UnityEngine;
using System.Collections;

public class GameManager: MonoBehaviour {

	public static int PickUpCount;
	public GUIText coins;
	
	void Awake(){
		
		PickUpCount = 0;
		
	}
	void OnGUI()
	{
		string text=string.Format ("Coins {0} ", PickUpCount);
		coins.text=text;
}
}
