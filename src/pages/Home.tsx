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
  // Variables de Estado (Lógica de Negocio)
  const [totalCuenta, setTotalCuenta] = useState<number | undefined>(); // Guardamos el total de la cuenta, inicialmente indefinido
  const [comensales, setComensales] = useState<number>(1); // Guardamos el número de comensales, inicialmente 1
  const [tipoPropina, setTipoPropina] = useState<string>('prefijada'); // Guardamos el tipo de propina, inicialmente 'prefijada'
  const [propinaPrefijada, setPropinaPrefijada] = useState<number>(15); // Guardamos el porcentaje de propina prefijada, inicialmente 15%
  const [propinaPersonalizada, setPropinaPersonalizada] = useState<number>(10); // Guardamos el porcentaje de propina personalizada, inicialmente 10%

  // Si el tipo de propina es 'prefijada', usamos el valor de propinaPrefijada, si es 'personalizada', usamos el valor de propinaPersonalizada
  const propinaAplicada = tipoPropina === 'prefijada' ? propinaPrefijada : propinaPersonalizada;
  
  // Función para calcular el pago por persona, devuelve un string con dos decimales
  const calcularPagoPorPersona = () => {
    if (!totalCuenta || totalCuenta <= 0 || comensales <= 0) return 0;
    const totalConPropina = totalCuenta + (totalCuenta * (propinaAplicada / 100));
    return (totalConPropina / comensales).toFixed(2);
  };

  // Vista (Interfaz de Usuario)
  return (
    <IonPage> {/* Contenedor principal de la página */}
      <IonHeader> {/* Encabezado de la página */}
        <IonToolbar color="tertiary"> 
          <IonTitle>Calculadora de Propinas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        
        {/* Entradas principales*/}
<IonCard> {/* Contenedor para las entradas de datos, con un diseño de tarjeta, contiene el total de la cuenta y el número de comensales */}
  <IonCardContent>
    <IonItem> {/* Item para el total de la cuenta, el icono y el input */}
      <IonIcon icon={cashOutline} slot="start" />
      <IonInput 
        label="Importe total de la cuenta (€)"
        labelPlacement="floating"
        type="number" 
        value={totalCuenta} 
        onIonChange={e => setTotalCuenta(parseFloat(e.detail.value!))}
      /> {/* Actualizamos el estado de totalCuenta al cambiar el input, convirtiendo el valor a número */}
    </IonItem>

    <IonItem> {/* Item para el número de comensales, el icono y el input */}
      <IonIcon icon={peopleOutline} slot="start" />
      <IonInput 
        label="Número de comensales"
        labelPlacement="floating"
        type="number" 
        value={comensales} 
        min="1"
        onIonChange={e => setComensales(parseInt(e.detail.value!, 10))}
      /> {/* Actualizamos el estado de comensales al cambiar el input, convirtiendo el valor a entero */}
    </IonItem>
  </IonCardContent>
</IonCard>

        {/* Selección del tipo de propina */}
        <IonCard>
          <IonRadioGroup value={tipoPropina} onIonChange={e => setTipoPropina(e.detail.value)}> {/* Grupo de radio para seleccionar el tipo de propina, actualizamos el estado de tipoPropina al cambiar la selección */}
            <IonListHeader>
              <IonLabel>Modalidad de Propina</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>Valores Prefijados</IonLabel>
              <IonRadio slot="start" value="prefijada" /> {/* Opción para propina prefijada, con valor 'prefijada' */}
            </IonItem>
            <IonItem>
              <IonLabel>Valor Personalizado</IonLabel>
              <IonRadio slot="start" value="personalizada" /> {/* Opción para propina personalizada, con valor 'personalizada' */}
            </IonItem>
          </IonRadioGroup>
        </IonCard>

        {/* Controles dinámicos según la modalidad elegida */}
        <IonCard>
          <IonCardContent>
            {tipoPropina === 'prefijada' ? ( // Si la modalidad es 'prefijada', mostramos las opciones de porcentaje prefijado
              <IonRadioGroup value={propinaPrefijada} onIonChange={e => setPropinaPrefijada(e.detail.value)}> {/* Grupo de radio para seleccionar el porcentaje de propina prefijada, actualizamos el estado de propinaPrefijada al cambiar la selección */}
                <IonItem>
                  <IonLabel>15% (Estándar)</IonLabel>
                  <IonRadio slot="end" value={15} /> {/* Opción para 15% de propina, con valor 15 */}
                </IonItem>
                <IonItem>
                  <IonLabel>20% (Buen servicio)</IonLabel>
                  <IonRadio slot="end" value={20} /> {/* Opción para 20% de propina, con valor 20 */}
                </IonItem>
                <IonItem>
                  <IonLabel>25% (Excelente)</IonLabel>
                  <IonRadio slot="end" value={25} /> {/* Opción para 25% de propina, con valor 25 */}
                </IonItem>
              </IonRadioGroup>
            ) : ( // Si la modalidad es 'personalizada', mostramos el control para seleccionar el porcentaje personalizado
              <>
                <IonLabel>Selecciona el porcentaje: {propinaPersonalizada}%</IonLabel>
                <IonRange 
                  min={0} 
                  max={100} 
                  pin={true} 
                  value={propinaPersonalizada} 
                  onIonChange={e => setPropinaPersonalizada(e.detail.value as number)} 
                /> {/* Control deslizante para seleccionar el porcentaje de propina personalizada, actualizamos el estado de propinaPersonalizada al cambiar el valor */}
              </>
            )}
          </IonCardContent>
        </IonCard>

        {/* Resultado Final */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h2 style={{ color: 'gray' }}>Total a pagar por persona:</h2>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#2dd36f' }}>
            {calcularPagoPorPersona()} € {/* Mostramos el resultado del cálculo del pago por persona, llamando a la función calcularPagoPorPersona para obtener el valor formateado con dos decimales */}
          </h1>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;