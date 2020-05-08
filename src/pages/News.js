import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import LinkList from '../components/Link/LinkList';
import SmallHeader from '../components/Header/SmallHeader';
import LargeHeader from '../components/Header/LargeHeader';

const News = (props) => {
    return (
        <IonPage>
            <SmallHeader title="Newsy"/>
            <IonContent fullscreen>
                <LargeHeader title="Newsy"/>
                <LinkList location={props.location} />
            </IonContent>
        </IonPage>
    );
};

export default News;
