type Content = {
    title: string;
    email: string;
    name: string;
};
export const WelcomeTemplate = (content: Content): string => `
   <main id="${content.title}">
   <h1>${content.title}</h1>
   <h2>Olá, ${content.name}!</h2>
   <p>Obrigado por se juntar à nós, seja muito bem vindo(a)!</p>
    </main>
 `;
