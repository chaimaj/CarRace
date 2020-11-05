using UnityEngine;
using System.Collections;

public class Menu : MonoBehaviour {
	private Color green= new Color(0.0F, 1.0F, 0.8F);
	public bool isQuit = false;
	public bool start =false;
	public bool solo=false;
	public bool duo=false;
	public GUIText bestTime;
	public bool records=false;
	public GameObject objsolo;
	public GameObject objduo;
	public GameObject delete;
	public GameObject back;	
	public GameObject title;	
	
	
	void OnMouseEnter(){
	renderer.material.color = green;
	
	}
	void OnMouseExit(){
		renderer.material.color =Color.white;
	}
	void OnMouseDown(){
		if (isQuit){
			Application.Quit ();
		}
		else if (start)
		{
			Instantiate (objduo);
			Instantiate (objsolo);
			GameObject quitter=GameObject.Find("Quit");
			quitter.transform.position = new Vector3 (quitter.transform.position.x, -22.0f,quitter.transform.position.z);
			GameObject rec=GameObject.Find("Records");
			rec.transform.position = new Vector3 (rec.transform.position.x, -11.0f,rec.transform.position.z);
		
		}
		else if (solo)
		{
			Application.LoadLevel("TestSceneSolo");
		}
		else if (duo)
		{
			Application.LoadLevel ("TestScene");
		}
		else if (records)
		{
			GameObject [] textes = GameObject.FindGameObjectsWithTag("Menu");
			foreach ( GameObject texte in textes){
				texte.SetActive(false);
			}
				string best=PlayerPrefs.GetString("PlayerName")+"  :"+PlayerPrefs.GetFloat("BestTime001");
				bestTime.text = best;
				gameObject.SetActive(false);
				bestTime.enabled =true;
			Instantiate (title);
			Instantiate (back);
			Instantiate (delete);
			
		}
	}
}
