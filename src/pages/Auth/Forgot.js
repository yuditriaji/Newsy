import React from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton, IonRouterLink } from '@ionic/react';
import NavHeader from '../../components/Header/NavHeader';

const INITIAL_STATE = {
    email: "",
};

const Forgot = () => {
    return(
        <IonPage>
            <NavHeader title="Password Reset" />
            <IonContent>
                <IonItem lines="full">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput name="name" type="text" required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" expand="block">
                            Get Reset Link
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default Forgot;