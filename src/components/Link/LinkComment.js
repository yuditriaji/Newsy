import React from 'react';
import UserContext from '../../contexts/UserContext';
import CommentModal from './CommentModal';
import firebase from '../../firebase';
import { IonList, IonItem, IonLabel, IonButton, IonCardContent, IonCard } from '@ionic/react';
import { formatDistanceToNow } from 'date-fns';


const LinkComment = ({ comment, link, setLink }) => {
    const { user } = React.useContext(UserContext);
    const [showModal, setShowModal] = React.useState(false);

    const postedByAuthUser = user && user.uid === comment.postedBy.id;

    function handleCloseModal(){
        setShowModal(false);
    }

    function handleEditComment(commentText) {
        console.log("YULI PALY PELER");
        const linkRef = firebase.db.collection("links").doc(link.id);
        linkRef.get().then(doc => {
            if(doc.exist) {
                const previousComments = doc.data().comments;
                console.log("yang pertama");
                const newComment = {
                    postedBy: { id: user.uid, name: user.displayName },
                    created: Date.now(),
                    text: commentText
                };
                console.log("yang kedua");
                const updatedComments = previousComments.map(item => 
                    item.created === comment.created ? newComment : item    
                );
                console.log("yang ketiga");
                linkRef.update({ comments: updatedComments });
                console.log("yang keempet");
                setLink(prevState => ({
                    ...prevState,
                    comments: updatedComments
                }));
            }
        });
        setShowModal(false);
    }

    function handleDeleteComment(){
        const linkRef = firebase.db.collection("links").doc(link.id);
        linkRef.get().then(doc => {
            if(doc.exist) {
                const previousComments = doc.data().comments;
                const updatedComments = previousComments.filter(
                    item => item.created !== comment.created
                );
                linkRef.update({ comments: updatedComments });
                setLink(prevState => ({
                    ...prevState,
                    comments: updatedComments
                }));
            }
        });
    }

    return(
        <>
            <CommentModal
             isOpen={showModal}
             title="Edit Comment"
             sendAction={handleEditComment}
             closeAction={handleCloseModal}
             comment={comment}
            />
            <IonCard>
                <IonCardContent>
                    <IonList lines="none">
                        <IonItem>
                            <IonLabel class="ion-text-wrap">
                                <p
                                    style={{
                                        alignItems: "center",
                                        fontSize: "0.8rem",
                                        fontWeight: "normal",
                                    }}
                                >
                                     {comment.postedBy.name} {" | "}
                                     {formatDistanceToNow(comment.created)}
                                </p>
                                <div className="ion-padding-veritcal">{comment.text}</div>
                                {postedByAuthUser && (
                                    <IonButton size="small" onClick={() => setShowModal(true)}>
                                        Edit
                                    </IonButton>
                                )}
                                {postedByAuthUser && (
                                    <IonButton size="small" onClick={() => handleDeleteComment(comment)}>
                                        Delete
                                    </IonButton>
                                )}
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </>
    );
};

export default LinkComment;