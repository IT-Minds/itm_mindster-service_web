import { Locale } from "./Locale";

export const table: Locale = {
  locale: "English (US)",

  example: {
    title: "Service Table",
    byLine: "When data is loading it is displayed below",
    dataLine: "{{type}} Child {{id}} ",
    actions: {
      addNew: "Add new Child"
    }
  },
  entityVariables: {
    name: "Name",
    identifier: "Identifier",
    description: "Description",
    title: "Title",
    actions: "Actions",
    adminNote: "Admin note"
  },
  commonButtons: {
    close: "Close",
    submit: "Submit",
    showMore: "Show more",
    showLess: "Show less",
    copy: "Copy",
    copied: "Copied",
    yes: "Yes",
    no: "No"
  },
  googleSearch: {
    addOwner: "Add owner",
    addOwnerText: "Add owners below by searching for the person and clicking their name",
    addApprover: "Add approver",
    addApproverText: "Add approvers below by searching for the person and clicking their name",
    searchPlaceholder: "Search for an It-Minds employee"
  },
  alerts: {
    approvers: {
      header: "Confirm approvers to be added",
      text: "Are you sure you want to add these approvers to your action?"
    },
    serviceOwners: {
      header: "Confirm owners to be added",
      text: "Are you sure you want to add these owners to your service?"
    },
    appOwners: {
      header: "Confirm owners to be added",
      text: "Are you sure you want to add these owners to your application?"
    }
  },
  entityNames: {
    single: {
      application: "Application",
      service: "Service",
      action: "Action",
      token: "Token",
      user: "User",
      approver: "Approver",
      owner: "Owner"
    },
    plural: {
      applications: "Applications",
      services: "Services",
      actions: "Actions",
      tokens: "Tokens",
      users: "Users",
      approvers: "Approvers",
      owners: "Owners"
    }
  },
  SelectorTabs: {
    recent: "Recent",
    starred: "Starred",
    all: "All"
  },
  applicationScreen: {
    serviceLibrary: {
      searchForService: "Search for a service",
      amountOfActions: "Amount of actions: {{x}}",
      requested: "Requested: {{x}}/{{y}} ",
      requestAccess: "Request actions",
      requestAccessExplain: "Request access to some of the following actions:",
      noActions: "No actions in this service yet"
    },
    modalHeaders: {
      addOwners: "Add owners to: {{application}}",
      selectApp: "Select application",
      createNewToken: "Create new token",
      serviceLibrary: "Service Library",
      tokenStatus: "Status of: ",
      getJwt: "Get JWT for your approved token;",
      generateAppSecret: "Are you sure you want to generate the AppSecret for your application",
      hereIsYourAppSecret: "Here is your AppSecret"
    },
    buttons: {
      createApp: "Create new application",
      toServicePage: "Service Page",
      addOwners: "Add owners",
      createToken: "Create new token"
    },
    tokens: {
      actions: {
        browseServices: "Browse services",
        requestReview: "Request review",
        checkStatus: "Check status",
        generateJwt: "Generate JWT",
        requestActions: "Request actions",
        details: "Details"
      },
      infoBoxes: {
        createTokenInfo: `(Danish)Here you can create a AppToken for your application. AppTokens are used to define a scope of services that your
        application wants to use. To create a AppToken you must first write a name that needs to be unique for the given application.
        The name will be converted into a identifier string which will be used throughout the application. Next you must write a 
        description of your tokens scope. Here you should describe what actions you are going to need as well as to what purpose.`,
        BrowseTokenInfo: `(DANISH)This is the service library where you can see all the available services and their actions.
        Use the search bar to filter the library based on service titles. To request and view further details about a service
        click their respective card. Here you can scroll through the service description to read about what each action does and how
        it is used, and finally at the end you can put checks next to the actions you want to request.
        After you've requested your actions there will be a button at the bottom of the screen which will submit your token for review.
        The respective service owners will then be able to review your request. You can follow the process on the next page
        or from the token table on the Application Screen.`,
        SeeTokenStatusInfo: `(DANISH)Here you can see what actions your token contains as well as their current status. Next to each actions is a symbol showing if
        your request has been approved, rejected or still pending for review. Mouse over rejected actions to see the rejection reason.
        If all your actions have been approved you can generate your JWT. The JWT is based on your unique Application identifier and your
        unique token identifier and its approved service actions. Finally you will also need to input your App Secret in order to sign the JWT.`,
        GenerateJwtInfo: `(DANISH)Here you can generate your JWT if you have your AppSecret at hand. Your AppSecret is a special
        string that only can be fetched once. Mostly the AppSecret is generated shortly after your application has been made.
        If you don't have your AppSecret try and check with your fellow ApplicationOwners to see if perhaps they've already generated it. If you've lost 
        your AppSecret you need to create a Application from scratch and go through the Create Token progress again. The generated JWT can
        then be used in your application to verify that you have access to the requested services and actions.`
      },
      appSecret: {
        appSecretPlaceholder: "Du fik denne da du oprettede applikationen",
        appSecretWarningBar: `You have not generated your AppSecret for this Application.
         This is required to generate your AppTokens and JWT`,
        appSecretWarning: `This can only be done once and you are responsible for keeping it safe and secure. The
        AppSecret is used for signing your AppTokens in order to generate a JWT.`,
        generateSecret: "Generate AppSecret"
      }
    }
  },
  serviceScreen: {
    modalHeaders: {
      selectService: "Select Service",
      addOwners: "Add owners to: {{service}}",
      addAction: "Add action"
    },
    buttons: {
      createNewService: "Create new service",
      toAppPage: "Application Page",
      addOwners: "Add owners",
      createNewAction: "Create action"
    },
    actions: {
      viewApprovers: "View approvers",
      viewApproversHeader: "Action approvers for: {{title}}",
      addApprovers: "Add approvers",
      addApproversHeader: "Add approvers to: {{title}}",
      copyApproversToAnotherAction: "Copy approvers to another action",
      copyApproversHeader: "Copy the following approvers from: {{title}}",
      copyApprovers: "Copy approvers"
    },
    pendingTokens: {
      header: "Pending tokens",
      cardTitle: "Token: {{identifier}} with {{count}} actions",
      reviewToken: "Review",
      reviewModal: {
        header: "Approve or decline actions for token: {{identifier}}",
        responses: {
          pending: "Pending",
          approved: "Approve",
          rejected: "Reject"
        },
        response: "Response",
        rejectionReason: "Rejection reason"
      }
    }
  },
  toasts: {
    success: "success",
    error: "Error",
    submitted: "Submitted",
    submittedE: "Submission failed:",
    xCreated: `{{x}} created`,
    xCreatedE: "{{x}} was not created, error:",
    xAdded: `{{x}} was not added`,
    xAddedE: "{{x}} was not added, error:",
    accessRequested: "Access was requested",
    accessRequestedE: "Access request failed:",
    reviewRequested: "Review requested",
    reviewRequestedE: "Review request failed:"
  }
};
