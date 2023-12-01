import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal } from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import {firestore} from '../../Firestore_Setup';
import {getFirestore,collection,addDoc, doc, Timestamp, updateDoc, setDoc,getDoc} from 'firebase/firestore';
import Comments from '../../components/Comments/Comments';


const images = [
   require('../../assets/pfps/1.jpg'),
   require('../../assets/pfps/2.jpg'),
   require('../../assets/pfps/3.jpg'),
   require('../../assets/pfps/4.jpg'),
   require('../../assets/pfps/5.jpg'),
   require('../../assets/pfps/6.jpg'),
   require('../../assets/pfps/7.jpg'),
   require('../../assets/pfps/8.jpg'),
   require('../../assets/pfps/9.jpg'),
   require('../../assets/pfps/10.jpg'),
   require('../../assets/pfps/11.jpg'),
   require('../../assets/pfps/12.jpg')

];

const clothImages=[
require('../../assets/hat.png'),
require('../../assets/shirt.png'),
require('../../assets/pants.png'),
require('../../assets/shoes.png'),
require('../../assets/moreOptions.png')


]


const clothingItems = [
  { key: 'hat', image: require('../../assets/hat.png'), text: 'Hat' },
  { key: 'shirt', image: require('../../assets/shirt.png'), text: 'Shirt' },
  { key: 'pants', image: require('../../assets/pants.png'), text: 'Pants' },
  { key: 'shoes', image: require('../../assets/shoes.png'), text: 'Shoes' },
  { key: 'more', image: require('../../assets/moreOptions.png'), text: 'More Options' },
];


const Post = ( { post,onLikeUpdated } ) => {

    console.log(Array.isArray(post.clothes));
    const [{ hat }, { shirt }, { pants }, { shoes }, { accessories }] = post.clothes;
    const navigation = useNavigation();

    const route = useRoute();

    const email = route.params?.email;



    const [isImageFilled, setImageFilled] = useState(true);

    const [commentsModalVisible, setCommentsModalVisible] = useState(false);

    const [clothingModalVisible, setClothingModalVisible] = useState(false);

    const openCommentsModal = () => {
      setCommentsModalVisible(true);
    };

    const closeCommentsModal = () => {
      setCommentsModalVisible(false);
    };
    const openClothingModal = () => {
        setClothingModalVisible(true);
        console.log(post.clothes);
    };

    const closeClothingModal = () => {
        setClothingModalVisible(false);
    };

    const updateLikes = async () => {
    try {
    //interchangable with line below, once merged with garrett code use this line: const title = post.postId;
        const title= post.postId;
        //const title = post.user+post.caption;
        console.log('postID: ', title);

        const postDocRef = doc(firestore, 'posts', title);
        const postDocSnapshot = await getDoc(postDocRef);

        console.log('postDocSnapshot:', postDocSnapshot);

        if (postDocSnapshot.exists()) {
          const postData = postDocSnapshot.data();
          console.log('postData:', postData);

          var likes = postData.likes;

          if(isImageFilled==true){
          likes++;
          await updateDoc(postDocRef, {
               likes: likes
               });
          }
          else{
          likes--;
          await updateDoc(postDocRef, {
               likes: likes
               });
          }
             onLikeUpdated();
        } else {
          console.warn('Document does not exist');
        }
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    };

    const toggleImage = () => {
      setImageFilled(!isImageFilled);
    };

    if (!post) {
        return null;
    }

    return (
/*<View style={styles.postTop}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Image source={(post.pfp === null || post.pfp === undefined)?images[0]:images[post.pfp-1]} style={styles.userIcon} />
              </TouchableOpacity>
              <View style={styles.userInfo}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Text style={styles.handle}>@{ post.user }</Text>
                </TouchableOpacity>
                <Text style={styles.time}>3 hours ago</Text>
              </View>
            </View>  */
        //got rid of the touchableOpacity that brought you back to your own profile....
        <View style={styles.postContent}>

          <View style={styles.postTop}>

                <Image source={(post.pfp === null || post.pfp === undefined)?images[0]:images[post.pfp-1]} style={styles.userIcon} />

            <View style={styles.userInfo}>

                <Text style={styles.handle}>@{ post.user }</Text>

              <Text style={styles.time}>3 hours ago</Text>
            </View>
          </View>

          <View style={styles.postBox}>
            <Image source={{ uri: post.imageURL }} style={styles.post} />

             {/* Semi-transparent overlay with text */}
             {clothingModalVisible && (
               <>
                 <View style={styles.overlay} />
                   <View style={styles.overlayContent}>
                         <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
                                     <Image source={require('../../assets/hat.png')} style={styles.hat} />
                                        <Text style={styles.boldText}>{hat.title} : </Text>
                                        <Text style={styles.boldText}>${hat.price === null||hat.price===undefined ? 'N/A' : hat.price}</Text>
                                   </TouchableOpacity>
                                   <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
                                     <Image source={require('../../assets/shirt.png')} style={styles.shirt} />
                                    <Text style={styles.boldText}>{shirt.title} : </Text>
                                    <Text style={styles.boldText}>${shirt.price=== null||shirt.price===undefined ? 'N/A' :  shirt.price}</Text>

                                   </TouchableOpacity>
                                   <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
                                     <Image source={require('../../assets/pants.png')} style={styles.pants} />
                                     <Text style={styles.boldText}>{pants.title} : </Text>
                                     <Text style={styles.boldText}>${pants.price=== null||pants.price===undefined ? 'N/A' : pants.price}</Text>

                                   </TouchableOpacity>
                                   <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
                                     <Image source={require('../../assets/shoes.png')} style={styles.shoes} />
                                     <Text style={styles.boldText}>{shoes.title} : </Text>
                                     <Text style={styles.boldText}>${shoes.price=== null||shoes.price===undefined ? 'N/A' : shoes.price}</Text>

                                   </TouchableOpacity>
                                   <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
                                     <Image source={require('../../assets/moreOptions.png')} style={styles.more} />
                                     <Text style={styles.boldText}>{accessories.title} : </Text>
                                     <Text style={styles.boldText}>{accessories.price=== null||accessories.price===undefined ? 'N/A' : `{accessories.price}`}</Text>

                                   </TouchableOpacity>


                    <TouchableOpacity onPress={closeClothingModal}>
                                     <Text style={styles.closeClothingButton}>Close</Text>
                                   </TouchableOpacity>
                 </View>
               </>
             )}




            <TouchableOpacity
              style={styles.clothingButton}
              onPress={openClothingModal}
            >
              <Image source={require('../../assets/hanger.png')} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>

          <View style={styles.postBottom}>
            <View style={styles.postButtons}>
              <TouchableOpacity onPress={() => {
                  updateLikes();
                  toggleImage();
              }}>
                {isImageFilled ? (<Image source={require('../../assets/logo2unfilled.png')} style={styles.unlikedButton} />) : (<Image source={require('../../assets/logo2.png')} style={styles.likedButton} />)}
              </TouchableOpacity>
              <TouchableOpacity style={styles.commentButton} onPress={openCommentsModal}>
                <Image source={require('../../assets/comment.png')} style={styles.commentButton} />
              </TouchableOpacity>
            </View>
            <View style={styles.checkCount}>
              <Text style={styles.checkCount}>
                <Text style={styles.boldText}>{ post.likes }</Text>
                  {' checks'}
              </Text>
            </View>
            <View style={styles.userCaption}>
              <Text style={styles.userCaption}>
                <Text style={styles.boldText}>{ post.user + ':'}</Text>
                { ' ' + post.caption }
              </Text>
            </View>
            <TouchableOpacity style={styles.viewComments} onPress={openCommentsModal}>
              <Text style={styles.viewComments}>View {post.comments.length} comment(s)</Text>
            </TouchableOpacity>
          </View>

          <Modal visible={commentsModalVisible} transparent={true} onRequestClose={closeCommentsModal}>
            <View style={styles.commentsContainer}>
              <Comments post = {post}/>
              <TouchableOpacity style={styles.closeContainer} onPress={closeCommentsModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
    );
};

    const styles = StyleSheet.create({
      postContent: {
        marginBottom: 40,
        position: 'relative',
      },
      post: {
        width: '100%',
        height: 500,
        borderRadius: 10,
        marginBottom: -6,
        position: 'relative',
      },
      postTop: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      userInfo: {},
      userIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      handle: {
        color: '#DCDCC8',
        fontSize: 25,
        paddingHorizontal: 10,
      },
      time: {
        color: '#DCDCC8',
        fontSize: 16.5,
        paddingHorizontal: 10,
        marginBottom: 3,
      },

      hat: {
          height: 30,
          width: 45,
        },
        shirt: {
          height: 45,
          width: 45,
        },
        pants: {
          height: 45,
          width: 30,
        },
        shoes: {
          height: 35,
          width: 45,
        },
        more: {
          height: 30,
          width: 45,
        },

      postBottom: {
      },
      postButtons:{
        flexDirection: 'row',
        top: 10,
      },
      unlikedButton: {
        height: 35,
        width: 35,
      },
      likedButton: {
        height: 35,
        width: 35,
      },
      commentButton: {
        height: 35,
        width: 35,
      },
      checkCount: {
        color: '#DCDCC8',
        fontSize: 20,
        top: 5,
      },
      userCaption: {
        color: '#DCDCC8',
        fontSize: 20,
        top: 5,
      },
      viewComments: {
        color: '#DCDCC8',
        fontSize: 15,
        top: 5,
      },
      boldText: {
        fontWeight: 'bold',
      },
      bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#142614',
        paddingVertical: 15,
        elevation: 5,
      },
      navItem: {
        flex: 1,
        alignItems: 'center',
      },
      navText: {
        color: '#fff',
        fontSize: 16,
      },
      navLogo: {
        height: 45,
        width: 45,
      },
      postLogo: {
        height: 80,
        width: 80,
      },
      postButton: {
        height: 0,
        width: 0,
        bottom: 160,
        left: 300,
      },
      menuItem:{
      flexDirection: 'row', // Align items horizontally
          alignItems: 'center',  // Align items vertically
          marginBottom: 10,      // Adjust this margin based on your design

      },
      commentsContainer: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#142614',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      },
      closeContainer: {
        borderRadius: 10,
        backgroundColor: '#3B593B',
        padding: 10,
        width: 100,
        elevation: 5,
        alignItems: 'center',
      },
      closeButton: {
        color: '#DCDCC8',
        fontSize: 16,
      },
      clothingButton: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        backgroundColor: 'transparent',
      },
      buttonImage: {
        height: 45,
        width: 45,
        resizeMode: 'contain',
      },

      clothingModalContainer: {
         position: 'absolute',  // Change to absolute
          zIndex: 2,              // Set a higher zIndex
          width: 331,
          height: 500.5,
          top: 79,
          left: 30,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          backgroundColor: 'rgba(20, 38, 20, 0.7)',
          borderRadius: 10,
      },
      modalText: {
        color: '#DCDCC8',
        fontSize: 20,
        marginBottom: 10,
      },
      closeClothingButton: {
        color: '#DCDCC8',
        fontSize: 16,
        marginTop: 10,
      },

        overlay: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },overlayContent: {
              ...StyleSheet.absoluteFillObject,
              justifyContent: 'center',
             alignItems: 'flex-start',
              zIndex: 2, // Make sure it appears above the overlay
            },
            overlayText: {
              color: '#FFFFFF', // Set the text color
              fontSize: 24,
              fontWeight: 'bold',
            },

      postBox: {

      }

    });

export default Post;