import React from "react";
import { IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonButtons } from "@ionic/react";

const NavHeader = ({title}) => {
    return(
        <IonHeader>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
                 <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default NavHeader;