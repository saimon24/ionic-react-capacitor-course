import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { logInOutline, personCircleOutline } from "ionicons/icons";
import FCC from "../assets/fcc.svg";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState<boolean | null>(null);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
  }, []);

  const doLogin = async (event: any) => {
    event.preventDefault();
    await present("Logging in...");
    setTimeout(async () => {
      dismiss();
      router.push("/app", "root");
    }, 2000);
  };

  const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: "true" });
  };

  const seeIntroAgain = () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };

  return (
    <>
      {introSeen === false ? (
        <Intro onFinish={finishIntro} />
      ) : (
        introSeen === true && (
          <IonPage>
            <IonHeader>
              <IonToolbar color={"success"}>
                <IonTitle>Free Code Camp</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent scrollY={false} className="ion-padding">
              <IonGrid fixed>
                <IonRow class="ion-justify-content-center">
                  <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                    <div className="ion-text-center ion-padding">
                      <img src={FCC} alt="FCC Logo" width={"50%"} />
                    </div>
                  </IonCol>
                </IonRow>

                <IonRow class="ion-justify-content-center">
                  <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                    <IonCard>
                      <IonCardContent>
                        <form onSubmit={doLogin}>
                          <IonInput
                            mode="md"
                            fill="outline"
                            labelPlacement="floating"
                            label="Email"
                            type="email"
                            placeholder="simon@ionicacademy.com"
                          ></IonInput>
                          <IonInput
                            mode="md"
                            className="ion-margin-top"
                            fill="outline"
                            labelPlacement="floating"
                            label="Password"
                            type="password"
                            placeholder="simon@ionicacademy.com"
                          ></IonInput>
                          <IonButton
                            type="submit"
                            expand="block"
                            className="ion-margin-top"
                          >
                            Login
                            <IonIcon icon={logInOutline} slot="end" />
                          </IonButton>
                          <IonButton
                            routerLink="/register"
                            color={"secondary"}
                            type="button"
                            expand="block"
                            className="ion-margin-top"
                          >
                            Create account
                            <IonIcon icon={personCircleOutline} slot="end" />
                          </IonButton>

                          <IonButton
                            onClick={seeIntroAgain}
                            fill="clear"
                            size="small"
                            color={"medium"}
                            type="button"
                            expand="block"
                            className="ion-margin-top"
                          >
                            Watch intro again
                            <IonIcon icon={personCircleOutline} slot="end" />
                          </IonButton>
                        </form>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
          </IonPage>
        )
      )}
    </>
  );
};

export default Login;
