import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { db /* storage */ } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '@react-native-firebase/storage';


export default function CameraPage() {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const [imageUpload, setImageUpload]= useState('')

    const userCollectionRef = collection(db,'images')
    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");

        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    if (photo) {
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        let savePhoto =  () => {
            setImageUpload(photo.target.files[0])
            alert(imageUpload)
            //alert(Image.getSizeWithHeaders(photo.uri, headers, success, [failure]));

            // alert(photo.uri)
            /* MediaLibrary.saveToLibraryAsync(photo.uri).then((response) => {
                setPhoto(undefined);
             
              }); 
              const imageRef = ref(storage, `/assets/${photo.name}`);
              const uploadTask = uploadBytesResumable(imageRef, photo)
              uploadTask.on("state_changed", (snapshot) => {
                  const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                  setprogressImage(prog);
              },
              (err) => console.log(err),
              () => {
              getDownloadURL(uploadTask.snapshot.ref)
                      .then(url => {
                          addDoc(userCollectionRef, {Image:url, location:'pretoria'})
                          setPhoto(undefined);
                          alert("submitted successfully")
  
                      })})
 */
         /*    const imageRef = ref(storage, `/assets/${photo.name+v4()}`);
            const uploadTask = uploadBytesResumable(imageRef, photo)
            uploadTask.on("state_changed", (snapshot) => {
                const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                setprogressImage(prog);
            },
            (err) => console.log(err),
            () => {
            getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        addDoc(userCollectionRef, {Image:url, location:'pretoria'})
                        setPhoto(undefined);
                        alert("submitted successfully")

                    })})
            
             
             */
        };

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <Button title="Discard" onPress={() => setPhoto(undefined)} />
                <Button title="Share" onPress={sharePic} />
                {hasMediaLibraryPermission ? <Button title="Save" onPress={()=>savePhoto()} /> : undefined}
                
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button title="Take Pic" onPress={takePic} />
            </View>
            <StatusBar style="auto" />
        </Camera>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});
