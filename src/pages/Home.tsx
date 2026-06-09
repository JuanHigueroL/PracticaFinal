import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonListHeader,
  IonRange,
  IonCard,
  IonCardContent,
  IonIcon
} from '@ionic/react';
import { cashOutline, peopleOutline } from 'ionicons/icons';
import './Home.css';

// Componente principal de la página Home, React.FC indica que es un componente funcional de React
const Home: React.FC = () => {
  // 1. Variables de Estado (Lógica de Negocio)
  const [totalCuenta, setTotalCuenta] = useState<number | undefined>();
  const [comensales, setComensales] = useState<number>(1);
  const [tipoPropina, setTipoPropina] = useState<string>('prefijada');
  const [propinaPrefijada, setPropinaPrefijada] = useState<number>(15);
  const [propinaPersonalizada, setPropinaPersonalizada] = useState<number>(10);

  // 2. Cálculos Matemáticos Automáticos
  const propinaAplicada = tipoPropina === 'prefijada' ? propinaPrefijada : propinaPersonalizada;
  
  const calcularPagoPorPersona = () => {
    if (!totalCuenta || totalCuenta <= 0 || comensales <= 0) return 0;
    const totalConPropina = totalCuenta + (totalCuenta * (propinaAplicada / 100));
    return (totalConPropina / comensales).toFixed(2);
  };

  // 3. Interfaz Gráfica (Capa de Vista)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Calculadora de Propinas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        
        {/* Entradas principales corregidas */}
<IonCard>
  <IonCardContent>
    <IonItem>
      <IonIcon icon={cashOutline} slot="start" />
      <IonInput 
        label="Importe total de la cuenta (€)"
        labelPlacement="floating"
        type="number" 
        value={totalCuenta} 
        onIonChange={e => setTotalCuenta(parseFloat(e.detail.value!))}
      />
    </IonItem>

    <IonItem>
      <IonIcon icon={peopleOutline} slot="start" />
      <IonInput 
        label="Número de comensales"
        labelPlacement="floating"
        type="number" 
        value={comensales} 
        min="1"
        onIonChange={e => setComensales(parseInt(e.detail.value!, 10))}
      />
    </IonItem>
  </IonCardContent>
</IonCard>

        {/* Selección del tipo de propina */}
        <IonCard>
          <IonRadioGroup value={tipoPropina} onIonChange={e => setTipoPropina(e.detail.value)}>
            <IonListHeader>
              <IonLabel>Modalidad de Propina</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>Valores Prefijados</IonLabel>
              <IonRadio slot="start" value="prefijada" />
            </IonItem>
            <IonItem>
              <IonLabel>Valor Personalizado</IonLabel>
              <IonRadio slot="start" value="personalizada" />
            </IonItem>
          </IonRadioGroup>
        </IonCard>

        {/* Controles dinámicos según la modalidad elegida */}
        <IonCard>
          <IonCardContent>
            {tipoPropina === 'prefijada' ? (
              <IonRadioGroup value={propinaPrefijada} onIonChange={e => setPropinaPrefijada(e.detail.value)}>
                <IonItem>
                  <IonLabel>15% (Estándar)</IonLabel>
                  <IonRadio slot="end" value={15} />
                </IonItem>
                <IonItem>
                  <IonLabel>20% (Buen servicio)</IonLabel>
                  <IonRadio slot="end" value={20} />
                </IonItem>
                <IonItem>
                  <IonLabel>25% (Excelente)</IonLabel>
                  <IonRadio slot="end" value={25} />
                </IonItem>
              </IonRadioGroup>
            ) : (
              <>
                <IonLabel>Selecciona el porcentaje: {propinaPersonalizada}%</IonLabel>
                <IonRange 
                  min={0} 
                  max={100} 
                  pin={true} 
                  value={propinaPersonalizada} 
                  onIonChange={e => setPropinaPersonalizada(e.detail.value as number)} 
                />
              </>
            )}
          </IonCardContent>
        </IonCard>

        {/* Resultado Final */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h2 style={{ color: 'gray' }}>Total a pagar por persona:</h2>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#2dd36f' }}>
            {calcularPagoPorPersona()} €
          </h1>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;