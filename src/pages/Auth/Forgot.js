import React from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton } from '@ionic/react';
import NavHeader from '../../components/Header/NavHeader';
import validateResetPassword from '../../validators/validateResetPassword';
import useForm from '../../hooks/useForm';
import firebase from '../../firebase';
import { toast } from '../../helper/toast';

const INITIAL_STATE = {
    email: "",
};

const Forgot = (props) => {
    const { handleSubmit, handleChange, values, isSubmitting } = useForm(
        INITIAL_STATE,
        validateResetPassword,
        handleResetPassword
    );
    const [busy, setBusy] = React.useState(false);

    async function handleResetPassword(){
        setBusy(true);
        const{email} = values;
        try {
            await firebase.resetPassword(email);
            toast("Check Your Email to Reset Your Password");
            props.history.push("/");
        } catch (err) {
            console.error("Password Reset Error", err);
            toast(err.message);
        }
        setBusy(false);
    }

    return(
        <IonPage>
            <NavHeader title="Password Reset" />
            <IonContent>
                <IonItem lines="full">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput name="email" type="text" value={values.email} onIonChange={handleChange} required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" expand="block" onClick={handleSubmit} disabled={isSubmitting}>
                            Get Reset Link
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default Forgot;