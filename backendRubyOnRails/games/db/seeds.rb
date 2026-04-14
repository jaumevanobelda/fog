puts "Creando Juegos..."

dev_nintendo = User.find_by(username: "Nintendo")
dev_sega = User.find_by(username: "Sega")
dev_sony = User.find_by(username: "Sony")

unless dev_nintendo && dev_sega && dev_sony
  puts "ADVERTENCIA: Faltan developers. Primero ejecuta el seed en auth."
  exit 1
end

cat_accion = Category.find_by(nom: "Acción")
cat_aventura = Category.find_by(nom: "Aventura")
cat_rpg = Category.find_by(nom: "RPG")
cat_plataformas = Category.find_by(nom: "Plataformas")
cat_estrategia = Category.find_by(nom: "Estrategia")
cat_deportes = Category.find_by(nom: "Deportes")

games_data = [
  { nom: "Super Mario Odyssey", descripcion: "Acompaña a Mario en modo 3D.", precio: 60, developer: dev_nintendo.id.to_s, isActive: true, category_ids: [cat_plataformas&.id, cat_aventura&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/8/8d/Super_Mario_Odyssey.jpg", "https://upload.wikimedia.org/wikipedia/en/a/a9/Super_Mario_Odyssey%2C_Cascade_Kingdom.png"] },
  { nom: "Zelda: Breath of the Wild", descripcion: "Aventura en mundo abierto.", precio: 60, developer: dev_nintendo.id.to_s, isActive: true, category_ids: [cat_aventura&.id, cat_rpg&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg", "https://upload.wikimedia.org/wikipedia/en/b/b3/Breath_of_the_Wild_paraglide.jpg"] },
  { nom: "Animal Crossing: New Horizons", descripcion: "Crea tu propia isla paradisíaca.", precio: 60, developer: dev_nintendo.id.to_s, isActive: true, category_ids: [cat_aventura&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/1/1f/Animal_Crossing_New_Horizons.jpg", "https://upload.wikimedia.org/wikipedia/en/6/6c/Animal_Crossing_New_Horizons_Gameplay.jpg"] },
  { nom: "Sonic Mania", descripcion: "Clásico 2D renovado.", precio: 20, developer: dev_sega.id.to_s, isActive: true, category_ids: [cat_plataformas&.id, cat_accion&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/d/d2/Sonic_Mania_%28artwork%29.jpg", "https://upload.wikimedia.org/wikipedia/en/c/c0/Dust_Hill_Mirage_Saloon.jpg"] },
  { nom: "Persona 5", descripcion: "Combate por turnos con los Ladrones Fantasma.", precio: 60, developer: dev_sega.id.to_s, isActive: true, category_ids: [cat_rpg&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/b/b0/Persona_5_cover_art.jpg", "https://upload.wikimedia.org/wikipedia/en/a/a5/Persona_5_Palace_Combat.jpg"] },
  { nom: "God of War", descripcion: "Viaje épico mundo nórdico.", precio: 40, developer: dev_sony.id.to_s, isActive: true, category_ids: [cat_accion&.id, cat_aventura&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg", "https://upload.wikimedia.org/wikipedia/commons/4/4b/God_of_war_2018_santa_monica_team_gdc_2019.jpg"] },
  { nom: "The Last of Us Part II", descripcion: "Una intensa historia de supervivencia y venganza.", precio: 70, developer: dev_sony.id.to_s, isActive: true, category_ids: [cat_accion&.id, cat_aventura&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png"] },
  { nom: "Horizon Zero Dawn", descripcion: "Caza máquinas colosales en un mundo post-apocalíptico.", precio: 50, developer: dev_sony.id.to_s, isActive: true, category_ids: [cat_accion&.id, cat_rpg&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/3/3e/Horizon_Zero_Dawn_cover_art.jpg", "https://upload.wikimedia.org/wikipedia/en/0/0e/Horizon_Zero_Dawn_screenshot.jpg"] },
  { nom: "Super Smash Bros. Ultimate", descripcion: "El legendario juego de lucha con el plantel más grande.", precio: 60, developer: dev_nintendo.id.to_s, isActive: true, category_ids: [cat_accion&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg", "https://upload.wikimedia.org/wikipedia/en/9/95/Super_Smash_Bros._Ultimate_gameplay.jpg"] },
  { nom: "Yakuza: Like a Dragon", descripcion: "Conviértete en un héroe en las calles de Yokohama.", precio: 60, developer: dev_sega.id.to_s, isActive: true, category_ids: [cat_accion&.id, cat_rpg&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/2/2f/Yakuza_like_a_dragon_cover_art.jpg", "https://upload.wikimedia.org/wikipedia/en/5/51/YLAD_combat_screen.jpg"] },
  { nom: "Ghost of Tsushima", descripcion: "Forja un nuevo camino como el Fantasma de Tsushima.", precio: 70, developer: dev_sony.id.to_s, isActive: true, category_ids: [cat_accion&.id, cat_aventura&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/b/b6/Ghost_of_Tsushima.jpg", "https://upload.wikimedia.org/wikipedia/en/0/0e/Ghost_of_Tsushima_pre-release_gameplay_screenshot.png"] },
  { nom: "Bloodborne", descripcion: "Enfrenta tus miedos mientras buscas respuestas en Yharnam.", precio: 20, developer: dev_sony.id.to_s, isActive: true, category_ids: [cat_accion&.id, cat_rpg&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg", "https://upload.wikimedia.org/wikipedia/en/3/36/Bloodborne_Alpha_PlayStation_4_gameplay_screenshot.png"] },
  { nom: "The Witcher 3", descripcion: "Aventura RPG del brujo Geralt.", precio: 30, developer: dev_sony.id.to_s, isActive: true, category_ids: [cat_rpg&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"] },
  { nom: "Shadow of the Colossus", descripcion: "Derrota a gigantes colosales.", precio: 40, developer: dev_sony.id.to_s, isActive: true, category_ids: [cat_aventura&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/commons/0/05/FumitoUedaE32016.jpg","https://upload.wikimedia.org/wikipedia/commons/9/95/Gojira_1954_Japanese_poster.jpg"] },
  { nom: "Elden Ring", descripcion: "Mundo abierto y fantasía oscura.", precio: 60, developer: dev_sony.id.to_s, isActive: true, category_ids: [cat_rpg&.id, cat_accion&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg","https://upload.wikimedia.org/wikipedia/en/4/4b/Elden_Ring_gameplay.png"] },
  { nom: "Death Stranding", descripcion: "Reconecta América.", precio: 50, developer: dev_sony.id.to_s, isActive: true, category_ids: [cat_aventura&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/2/22/Death_Stranding.jpg","https://upload.wikimedia.org/wikipedia/en/1/1d/Death_Stranding_pre-release_gameplay_screenshot.png"] },
  { nom: "Gran Turismo 7", descripcion: "Simulador de conducción real.", precio: 70, developer: dev_sony.id.to_s, isActive: true, category_ids: [cat_deportes&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/1/14/Gran_Turismo_7_cover_art.jpg"] },
  { nom: "Super Mario Galaxy", descripcion: "Mario viaja al espacio.", precio: 60, developer: dev_nintendo.id.to_s, isActive: true, category_ids: [cat_plataformas&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/7/76/SuperMarioGalaxy.jpg"] },
  { nom: "Splatoon 2", descripcion: "Pinta todo el mapa.", precio: 50, developer: dev_nintendo.id.to_s, isActive: true, category_ids: [cat_accion&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/0/04/Splatoon2TurfWarGameplay.png","https://upload.wikimedia.org/wikipedia/en/4/49/Splatoon_2.jpg"] },
  { nom: "Super Metroid", descripcion: "Clásico inigualable 2D.", precio: 10, developer: dev_nintendo.id.to_s, isActive: true, category_ids: [cat_aventura&.id, cat_plataformas&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/e/e4/Smetroidbox.jpg"] },
  { nom: "Pikmin 4", descripcion: "Lidera las criaturas Pikmin.", precio: 60, developer: dev_nintendo.id.to_s, isActive: true, category_ids: [cat_estrategia&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/e/e9/Pikmin_fighting_a_Bulborb_in_Pikmin_4.jpg","https://upload.wikimedia.org/wikipedia/en/4/4d/Pikmin_icon_4.jpg"] },
  { nom: "Sonic Frontiers", descripcion: "Mundo abierto veloz.", precio: 60, developer: dev_sega.id.to_s, isActive: true, category_ids: [cat_accion&.id, cat_plataformas&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/c/c5/Sonic_Frontiers_box_art.jpg"] },
  { nom: "Yakuza 0", descripcion: "El inicio de la leyenda de Kiryu.", precio: 20, developer: dev_sega.id.to_s, isActive: true, category_ids: [cat_accion&.id, cat_rpg&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/b/ba/Yakuza0.jpg"] },
  { nom: "Judgment", descripcion: "Resuelve crímenes en Kamurocho.", precio: 40, developer: dev_sega.id.to_s, isActive: true, category_ids: [cat_accion&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/9/9a/Judgment_Cover_Art.jpg"] },
  { nom: "Smash Bros Melee", descripcion: "El clásico de Gamecube.", precio: 40, developer: dev_nintendo.id.to_s, isActive: true, category_ids: [cat_accion&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/2/29/Super_Smash_Bros_Melee_Box_Art.jpg","https://upload.wikimedia.org/wikipedia/commons/9/9d/Melee_tournament_sa.jpg"] },
  { nom: "Kirby y la tierra olvidada", descripcion: "Aventura rosa.", precio: 60, developer: dev_nintendo.id.to_s, isActive: true, category_ids: [cat_plataformas&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/e/e7/Kirby_and_The_Forgotten_Land_Icon.jpg","https://upload.wikimedia.org/wikipedia/en/e/ee/Kirby_and_the_Forgotten_Land_Mouthful_Mode.jpg"] },
  { nom: "Donkey Kong Country", descripcion: "Clásico de SNES.", precio: 10, developer: dev_nintendo.id.to_s, isActive: true, category_ids: [cat_plataformas&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/9/98/DKCRereleaseComparison.png"] },
  { nom: "Streets of Rage", descripcion: "Pelea en las calles.", precio: 15, developer: dev_sega.id.to_s, isActive: true, category_ids: [cat_accion&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/8/81/Streets_of_Rage_logo_%282024%29.png"] },
  { nom: "Shenmue", descripcion: "Aventura pionera.", precio: 20, developer: dev_sega.id.to_s, isActive: true, category_ids: [cat_aventura&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/4/44/Shenmue_series_logo.png","https://upload.wikimedia.org/wikipedia/en/a/a2/Shenmue_Combat_Screen.jpg"] },
  { nom: "Crazy Taxi", descripcion: "Conducción arcade.", precio: 15, developer: dev_sega.id.to_s, isActive: true, category_ids: [cat_deportes&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/3/3a/Crazy-taxi-cabinet.jpg","https://upload.wikimedia.org/wikipedia/en/f/f4/Crazy_Taxi-A_Redemption_Game.jpg"] },
  { nom: "Golden Axe", descripcion: "Combate beat em up.", precio: 10, developer: dev_sega.id.to_s, isActive: true, category_ids: [cat_accion&.id].compact, images: ["https://upload.wikimedia.org/wikipedia/en/3/3a/Golden_Axe_logo.png"] }
]

games_data.each do |data|
  category_ids = data.delete(:category_ids)
  images = data.delete(:images)
  
  game = Game.find_or_initialize_by(nom: data[:nom])
  game.update!(data)
  game.category_ids = category_ids if category_ids.any?
  
  if images.present?
    game.game_images.destroy_all
    images.each do |img|
      game.game_images.create!(image: img)
    end
  end
end

