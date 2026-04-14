puts "Creando Categorías..."
categories = ["Acción", "Aventura", "RPG", "Estrategia", "Deportes", "Plataformas"]

categories.each do |cat_name|
  cat = Category.find_or_initialize_by(nom: cat_name)
  cat.update!(isActive: true)
  puts "-> Categoría creada: #{cat.nom}"
end

