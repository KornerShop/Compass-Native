import LocalizedStrings from 'react-localization'

const languageStrings = new LocalizedStrings({
  en: {
    wic: {
      header: "Determine whether you're likely to be eligible for WIC",
      householdSize: "Household Size",
      income: "Monthly Income/Social Security"
      lifeEvents: "Are you pregnant and/or have a child under the age of 5?"
      yes: "Yes",
      no: "No",
    },
    eligible: {
      header: "You may be eligible! Go to a local office to confirm",
    },
    ineligible: {
      header: "You may be ineligible, but you do have options. Go to a local office to learn more",
    },
    zipModal: {
      header: "Find Offices Near You",
      zipCode: "Zip Code",
    },
    buttons: {
      submit: "Submit",
      accessibilitySubmit: "Find offices near you",
      recheck: "Recheck",
      accessibilityRecheck: "Check your eligiblity again",
    }
  },
  es: {
    wic: {
      header: "Determine si es probable que sea elegible para WIC",
      householdSize: "Tamaño del hogar",
      income: "Ingreso Mensual / Seguridad Social",
      lifeEvent: "¿Está usted embarazada y / o tiene un hijo menor de 5 años?",
      yes: "Sí",
      no: "No",
    },
    eligible:{
      header: "¡Puede ser elegible! Ir a una oficina local para confirmar",
    },
    ineligible: {
      header: "Usted puede ser inelegible, pero usted tiene opciones. Ir a una oficina local para obtener más información",
    },
    zipModal: {
      header: "Encuentre oficinas cerca de usted",
      zipCode: "Código postal"
    },
    buttons: {
      submit: "Enviar",
      accessibilitySubmit: "Encuentre oficinas cerca de usted",
      recheck: "Volver a comprobar",
      accessibilityRecheck: "Revise su elegibilidad nuevamente"
    }
  },
})
