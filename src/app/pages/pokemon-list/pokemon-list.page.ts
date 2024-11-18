import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  pokemons: any[] = [];
  loading = false;
  filteredPokemons: any[] =[];
  pokemonDetails: any = null;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.fetchPokemons();
    
  }

  fetchPokemons() {
    this.loading = true;
    this.pokemonService.getPokemons(50).subscribe({
      next: (response) => {
        this.pokemons = response.results;
        this.filteredPokemons = [...this.pokemons];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon:', error);
        this.loading = false;
      },
    });
  }

  handleBusqueda(event: any){
    const query = event.target.value.toLowerCase();
    this.filteredPokemons = this.pokemons.filter((pokemon)=> pokemon.name.toLowerCase().includes(query));
    console.log(this.filteredPokemons);
  
    this.loading = true;
    const name = (document.getElementById("buscarPokemon") as HTMLInputElement).value.trim().toLocaleLowerCase();
    
    this.pokemonService.getPokemonDetails(name).subscribe({
      next: (details) =>{
        console.log(details);
        this.pokemonDetails = details
        this.loading = false;
      },
      error: (error)=>{
        console.log(error);
        this.loading = false;
      }
    })
  }

}