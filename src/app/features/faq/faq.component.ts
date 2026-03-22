import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  readonly items = [
    {
      question: `Qu'est-ce que Passe-simple ?`,
      answer: `Passe-simple est un magazine suisse de culture et d'histoire proposant des recettes authentiques liées au patrimoine culinaire helvétique.`,
    },
    {
      question: 'Comment filtrer les recettes par canton ?',
      answer: `Utilisez le filtre Canton dans la barre de recherche pour afficher uniquement les recettes d'une région spécifique.`,
    },
    {
      question: 'Les recettes sont-elles adaptées aux régimes spéciaux ?',
      answer: 'Oui, chaque recette est étiquetée selon les régimes (végétarien, sans gluten, etc.). Utilisez les filtres pour affiner votre sélection.',
    },
  ];
}
