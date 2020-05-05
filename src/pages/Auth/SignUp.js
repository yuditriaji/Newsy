import React from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton, IonRouterLink, IonLoading } from '@ionic/react';
import NavHeader from '../../components/Header/NavHeader';
import validateSignup from '../../validators/validateSignup';
import useForm from '../../hooks/useForm';
import firebase from '../../firebase';
import { toast } from '../../helper/toast';
// import { attachProps } from '@ionic/react/dist/types/components/utils';

const INITIAL_STATE = {
    name: "",
    email: "",
    password: "",
};

const Signup = (props) => {
    const { handleSubmit, handleChange, values, isSubmitting } = useForm(
        INITIAL_STATE,
        validateSignup,
        authenticateUser
    );
    const [busy, setBusy] = React.useState(false);
    
    async function authenticateUser(){
        setBusy(true);
        const{name, email, password} = values;
        try {
            await firebase.register(name, email, password);
            toast("You have logged in successfully!");
            props.history.push("/");
        } catch (err) {
            console.error("Authentication Error", err);
            toast(err.message);
        }
        setBusy(false);
    }

    return(
        <IonPage>
            <NavHeader title="Sign Up" />
            <IonLoading message="Please Wait..." isOpen={busy}/>
            <IonContent>
            <IonItem lines="full">
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput name="name" type="text" value={values.name} onIonChange={handleChange} required></IonInput>
            </IonItem>
                <IonItem lines="full">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput name="email" type="text" value={values.email} onIonChange={handleChange} required></IonInput>
                </IonItem>
                <IonItem lines="full">
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput name="password" type="password" value={values.password} onIonChange={handleChange} required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" expand="block" onClick={handleSubmit} disabled={isSubmitting}>
                            Sign Up
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol class="ion-text-center ion-padding-vertical"> 
                        <IonRouterLink routerLink={"/forgot"}>
                            Forgot Password?
                        </IonRouterLink>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default Signup;