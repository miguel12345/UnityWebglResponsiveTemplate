using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RotatingCube : MonoBehaviour {

	public float Speed = 20f;

	// Update is called once per frame
	void Update () {
		transform.Rotate (new Vector3 (0f,Time.deltaTime * Speed,0f));		
	}
}
