import React from 'react';
import { IonModal, IonHeader, IonToolbar, IonButton, IonButtons, IonContent, IonTextarea, IonTitle } from '@ionic/react';

const CommentModal = ({ isOpen, title, sendAction, closeAction, comment }) => {
    const [commentText, setCommentText] = React.useState(
        comment ? comment.text: ""
    );

    function handleSendAction(item){
        sendAction(item);
        setCommentText("");
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={closeAction}>
            <IonHeader translucent>
                <IonToolbar color="primary">
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="start">
                        <IonButton onClick={closeAction}>Close</IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={() => handleSendAction(commentText)}>
                            Send
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonTextarea 
                    rows={25}
                    cols={25}
                    placeholder="Your Comment"
                    value={commentText}
                    onIonChange={e => setCommentText(e.target.value)}
                />
            </IonContent>
        </IonModal>
    )
}

export default CommentModal;