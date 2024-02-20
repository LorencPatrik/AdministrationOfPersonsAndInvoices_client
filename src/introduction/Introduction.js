
function Introduction() {
  return (
    <div className="px-2">
      <h3 className="text-decoration-underline text-black text-opacity-75">Uvodní informace</h3>
      <h5 className="pt-2">Vítejte na úvodní stránce webové aplikace, která reprezentuje mou závěrečnou práci rekvalifikačního kurzu Java PRO u ITnetwork.cz</h5>
      <h6 className="pt-2">Oproti zadání jsem přidal následující funkce:</h6>
      <ul>
        <li>Stránkování požadovaných dat</li>
        <li>Paginanci pro vyžádání jednotlivých stránek</li>
        <li>Paginance bere v úvahu nastavený limit povoleného počtu řádků tabulky</li>
        <li>Řazení zobrazených dat pro každý sloupec tabulky + volba směru řazení</li>
        <li>Načítací spinnery. I několika násobné např. u detailu osoby, kde také řeším nezobrazení tabulky pro kterou nedorazí data</li>
        <li>Ošetřil jsem i některé další stavy, kdy po načtení ze serveru nedorazí data k zobrazení</li>
        <li>Nemáme-li v db osoby nelze vytvořit fakturu. Potřebujeme vybrat prodávajícího a nakupujícího...</li>
        <li>Validace vstupních dat k filtraci pomocí enum na straně beckendu</li>
      </ul>
      <h6>Pár nedostatků co jsem oproti mému plánu nestihl do odevzdání vyřešit:</h6>
      <ul>
        <li>Stavové zprávy - alert messages po akcích na databázi</li>
        <li>Po návratu zpět z některé podstránky se vrátí výchozí stav řazení a filtrace</li>
        <li>Validace React-Selectu</li>
        <li>Používat správně možnost přidání závislostí v UseEffect a tím se vyhnout volání apiGet z mnoha míst komponent</li>
        <li>A také další drobnosti na které jsem si nyní nevzpomněl...</li>
      </ul>
      <h6>Je i pár dalších funkcí, které mám v plánu ještě přidat:</h6>
      <ul>
        <li>Vyměnit Selecty za pokročilejší např. autocomplete s "našeptávačem"</li>
        <li>Přidat Spring Security a další entitu osob. Budou to návštěvníci stránky s různými oprávněními</li>
        <li>Stylování aplikace a zaměřit se na responzivitu + použít Material Ui</li>
      </ul>
      <p>Děkuji za vyzkoušení.</p>
    </div>
  )
}

export default Introduction;
