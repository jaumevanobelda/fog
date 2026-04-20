puts "Creando Usuarios Admin y Developer..."

admin = User.find_or_initialize_by(email: "admin@admin.com")
admin.update!(username: "admin", password: "a", role: "SUPERADMIN", isActive: true)
puts "-> Admin creado (admin / a)"

dev1 = User.find_or_initialize_by(email: "dev1@nintendo.com")
dev1.update!(username: "Nintendo", password: "a", role: "DEVELOPER", isActive: true)
puts "-> Developer creado: #{dev1.username}"

dev2 = User.find_or_initialize_by(email: "dev2@sega.com")
dev2.update!(username: "Sega", password: "a", role: "DEVELOPER", isActive: true)
puts "-> Developer creado: #{dev2.username}"

dev3 = User.find_or_initialize_by(email: "dev3@sony.com")
dev3.update!(username: "Sony", password: "a", role: "DEVELOPER", isActive: true)
puts "-> Developer creado: #{dev3.username}"

