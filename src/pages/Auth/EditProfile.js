import React from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton, IonRouterLink, IonLoading } from '@ionic/react';
import NavHeader from '../../components/Header/NavHeader';
import validateEditProfile from '../../validators/validateEditProfile';
import useForm from '../../hooks/useForm';
import firebase from '../../firebase';
import { toast } from '../../helper/toast';
import UserContext from '../../contexts/UserContext';
// import { attachProps } from '@ionic/react/dist/types/components/utils';


const EditProfile = (props) => {
    const { user, setUser } = React.useContext(UserContext);
    const INITIAL_STATE = {
        name: user && user.displayName,
        email: user && user.email,
        newPassword: "",
        currentPassword: "",
    };
    const { handleSubmit, handleChange, setValues, values, isSubmitting } = useForm(
        INITIAL_STATE,
        validateEditProfile,
        authenticateUser
    );
    const [busy, setBusy] = React.useState(false);

    async function reauthenticate(email, password){
        const credential = firebase.app.auth.EmailAuthProvider.credential(
            email,
            password
        );
        try {
            await user.reauthenticateWithCredential(credential);
            console.log("Reauthentication Successful");
        } catch (err) {
            console.error("Profile Update Error", err);
            toast(err.message);
        }
    }

    async function updateProfileItems(name, email, password){
        await user.updateProfile({
            displayName: name, 
        });
        await user.updateEmail(email);
        if(password){
            await user.updatePassword(password);
        }
    }
    
    async function authenticateUser(){
        setBusy(true);
        const{name, email, currentPassword, newPassword} = values;
        try {
            await reauthenticate(user.email, currentPassword);
            await updateProfileItems(name, email, newPassword);
            const result = await firebase.login(
                email,
                newPassword || currentPassword
            );
            setValues({
                name: user && user.displayName,
                email: user && user.email,
                newPassword: "",
                currentPassword: "",
            });
            setUser(result.user);
            toast("You have updated your profile successfully!");
            props.history.push("/profifle");
        } catch (err) {
            console.error("Profile Update Error", err);
            toast(err.message);
        }
        setBusy(false);
    }

    return(
        <IonPage>
            <NavHeader title="Edit Profile" />
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
                    <IonLabel position="floating">New Password</IonLabel>
                    <IonInput name="password" type="password" value={values.newPassword} onIonChange={handleChange} required></IonInput>
                </IonItem>
                <IonItem lines="full">
                    <IonLabel position="floating">Current Password</IonLabel>
                    <IonInput name="password" type="password" value={values.currentPassword} onIonChange={handleChange} required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" expand="block" onClick={handleSubmit} disabled={isSubmitting}>
                            Save
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default EditProfile;