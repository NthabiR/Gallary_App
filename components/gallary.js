import { useState,useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
function Gallery(){
    const navigation = useNavigation()
    const [gallery, setGallery] = useState([])
    const userCollectionRef = collection(db,'images')

    useEffect(() => {
        const getImages = async () => {
            const data = await getDocs(userCollectionRef)
            setGallery(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getImages();
      console.log(gallery)
    })


    return(
        <View>
            <View>
                <Button title='Camera' onPress={() => navigation.navigate('CameraPage')}/>
            </View>
            <View>
                {gallery.map((images,xid)=>(
                    <View key={xid}>
                        <Image  style={styles.image}  source={images.Image}/>
                        <Text>{images.location}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width:500,
        height:500 ,
    }
})


export default Gallery;