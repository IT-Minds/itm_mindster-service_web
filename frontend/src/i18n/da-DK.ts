import { Locale } from "./Locale";

export const table: Locale = {
  locale: "Dansk",

  example: {
    title: "Service tabel",
    byLine: "Når dataen er indhentet vises den her",
    dataLine: "{{type}} Barn {{id}} ",

    actions: {
      addNew: "Tilføj et nyt barn"
    }
  },
  entityVariables: {
    name: "Navn",
    identifier: "Identifikator",
    description: "Beskrivelse",
    title: "Titel",
    actions: "Handlinger",
    adminNote: "Admin note"
  },
  commonButtons: {
    close: "Luk",
    submit: "Indsend",
    showMore: "Vis mere",
    showLess: "Vis mindre",
    copy: "Kopiér",
    copied: "Kopieret",
    yes: "Ja",
    no: "Nej"
  },
  googleSearch: {
    addOwner: "Tilføj ejer",
    addOwnerText:
      "Tilføj en ny ejer ved at søge efter personen nedenunder og derefter trykke på deres navn",
    addApprover: "Tilføj godkender",
    addApproverText:
      "Tilføj en godkender ved at søge efter personen nedenunder og derefter trykke på deres navn",
    searchPlaceholder: "Søg efter en It-Minds medarbejder"
  },
  alerts: {
    approvers: {
      header: "Bekræft godkendere der skal tilføjes",
      text: "Er du sikker på at du vill tilføje disse godkendere til din action?"
    },
    serviceOwners: {
      header: "Bekræft ejere der skal tilføjes",
      text: "Er du sikker på at du vill tilføje disse godkendere til din service?"
    },
    appOwners: {
      header: "Bekræft ejere der skal tilføjes",
      text: "Er du sikker på at du vill tilføje disse godkendere til din applikation?"
    }
  },
  entityNames: {
    single: {
      application: "Applikation",
      service: "Service",
      action: "Handling",
      token: "Token",
      user: "Bruger",
      approver: "Godkender",
      owner: "Ejer"
    },
    plural: {
      applications: "Applikationer",
      services: "Services",
      actions: "Handlinger",
      tokens: "Tokens",
      users: "Brugere",
      approvers: "Godkendere",
      owners: "Ejere"
    }
  },
  SelectorTabs: {
    recent: "Nylige",
    starred: "Stjernemærket",
    all: "Alle"
  },
  applicationScreen: {
    serviceLibrary: {
      searchForService: "Søg efter en Service",
      amountOfActions: "Antal handlinger: {{x}}",
      requested: "Anmodet {{x}}/{{y}} ",
      requestAccess: "Anmod om adgang",
      requestAccessExplain: "Anmod om adgang til 1 eller flere af de følgende handlinger:",
      noActions: "Denne service har ikke nogen handlinger endnu"
    },
    modalHeaders: {
      addOwners: "Tilføj ejere til: {{application}}",
      selectApp: "Vælg applikation",
      createNewToken: "Opret ny Token",
      serviceLibrary: "Service Bibliotek",
      tokenStatus: "Status for: ",
      getJwt: "Få JWT'en for din godkendte token;",
      generateAppSecret: "Er du sikker på at du gerne vil generere din applikations AppSecret?",
      hereIsYourAppSecret: "Her er din AppSecret til"
    },
    buttons: {
      createApp: "Opret ny applikation",
      toServicePage: "Service siden",
      addOwners: "Tilføj ejerer",
      createToken: "Opret ny token"
    },
    tokens: {
      actions: {
        browseServices: "Find services",
        requestReview: "Anmod om gennemgang",
        checkStatus: "Se status",
        generateJwt: "Generer JWT",
        requestActions: "Andmod om handlinger",
        details: "Details"
      },
      infoBoxes: {
        createTokenInfo: `Her kan oprette en Token til din applikation. Token’en kan bruges til at definere et antal a services
         som din applikation gerne vil gøre brug af. For at oprette en token skal du først give den et unikt navn indenfor din 
         nuværende applikation. Navnet bliver omskrevet til en identifikator baseret på dit input. 
         Derefter skal du beskrive hvad din token skal bruges til, samt hvilke service handlinger den behøver, og til hvilket formål.`,
        BrowseTokenInfo: `Dette er service biblioteket, hvor du kan se alle de tilgængelige services og deres handlinger. 
        Via søgefeltet kan du fremsøge specifikke services baseret på deres titel. 
        For at anmode om en service og for at se yderligere detaljer kan du klikke på den service du er interesseret i. 
        Derefter kan du så læse beskrivelsen af services igennem, og forstå hvilke handlinger der er tilgængelige og 
        hvad det kræver at bruge dem. Nedenunder beskrivelsen finder du listen af handlinger hvor man kan krydse de af 
        man gerne vil anmode om. Når du er færdig med at anmode om adgang til de services du skal bruge 
        så kan du trykke på en knap nederst på siden for at sende dine anmodninger til gennemgang. 
        Dette låser din token så du ikke kan anmode om andre services og sender den til gennemgang af de pågældende service ejerer.`,
        SeeTokenStatusInfo: `Her kan du se hvilke handlinger din token indeholder, og hvilken status de har på nuværende tidspunkt. 
        Dette ses ud fra symbolet til højre fra hver handling som enten kan vise godkendt, afvist eller afventer. 
        Er anmodningen blevet afvist kan man trykke på krydset for at læse grunden for afvisningen.
        Hvis alle dine anmodninger er blevet godkendt kan du få generet din JWT. 
        JWT’en beskriver din applikation, din unikke token og listen af de handlinger som du har fået adgang til. 
        Få at genere JWT’en skal du have din AppSecret klar da den skal bruges til at underskrive.
        `,
        GenerateJwtInfo: `Her kan du skrive din AppSecret nedenunder for at signere og modtage din JWT for den pågældende token. 
        JWT’en kan derefter bruges i din applikation som en verifikation af at du har adgang til de services du laver kald til.
        Hvad er min AppSecret?  Din AppSecret er et unikt kodeord som kun kan udleveres 1 gang. 
        Dette gøres ofte kort tid efter man først har oprettet sin applikation og altid før man begynder at oprette tokens. 
        Hvis i er flere der har adgang til applikation så kan det også være at en af de andre ejere har hentet AppSecret’en. 
        Hvis du har mistet din AppSecret så kan du ikke længere oprette JWTs og er derfor nødt til at oprette applikationen på ny, 
        samt skal du også igennem token processen med at anmode om adgang, og derfra få godkendt anmodningen.
        `
      },
      appSecret: {
        appSecretPlaceholder: "Du fik denne da du oprettede applikationen",
        appSecretWarningBar: `Du har ikke generet en AppSecret til denne applikation. Dette er nødvendigt før du kan oprette tokens
        og derfra JWT's`,
        appSecretWarning: `Dette kan kun gøres en gang og du er selv ansvarlig for at holde din secret sikker og hemmelig.
        Du bruger AppSecret'en til at signere dine tokens for derefter at få genereret en JWT`,
        generateSecret: "Generer AppSecret"
      }
    }
  },
  serviceScreen: {
    modalHeaders: {
      selectService: "Vælg Service",
      addOwners: "Tilføj ejere til: {{service}}",
      addAction: "Opret ny handling"
    },
    buttons: {
      createNewService: "Opret service",
      toAppPage: "Applikation side",
      addOwners: "Tilføj ejere",
      createNewAction: "Opret handling"
    },
    actions: {
      viewApprovers: "Vis godkendere",
      viewApproversHeader: "Handlings godkendere for: {{title}}",
      addApprovers: "Tilføj godkendere",
      addApproversHeader: "Tilføj godkendere til: {{title}}",
      copyApproversToAnotherAction: "Kopier godkendere til en anden handling",
      copyApproversHeader: "Kopier følgende godkendere fra: {{title}}",
      copyApprovers: "Kopier godkendere"
    },
    pendingTokens: {
      header: "Tokens der afventer svar",
      cardTitle: "Token: {{identifier}} med {{count}} handlinger",
      reviewToken: "Gennemgå",
      reviewModal: {
        header: "Godkend eller afvis handlingerne for token: {{identifier}}",
        responses: {
          pending: "Afventer",
          approved: "Godkendt",
          rejected: "Afvist"
        },
        response: "Svar",
        rejectionReason: "Årsag til afvisning"
      }
    }
  },
  toasts: {
    success: "Success",
    error: "Fejl",
    submitted: "Indsendt",
    submittedE: "Indsendelse fejlede:",
    xCreated: `{{x}} opretted`,
    xCreatedE: "{{x}} blev ikke oprettet, fejl:",
    xAdded: `{{x}} blev tilføjet`,
    xAddedE: "{{x}} blev ikke tilføjet, fejl:",
    accessRequested: "Anmod om adgang",
    accessRequestedE: "Anmod om adgang fejlede: ",
    reviewRequested: "Gennemgang efterspurgt",
    reviewRequestedE: "Efterspørgsel på gennemgang fejlede:"
  }
};
