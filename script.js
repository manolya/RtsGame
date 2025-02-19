const SUPABASE_URL = "https://esdmtizkgtovkadfkqmw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZG10aXprZ3RvdmthZGZrcW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NzMzODQsImV4cCI6MjA1NTU0OTM4NH0.8XZTQf_c_uz2WE_A6sW3l-I3MFqMiMDROZAf6Wx4pb4 ";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let userId = null;

// 🔐 Login Function
async function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password
    });

    if (error) {
        document.getElementById("loginMessage").innerText = "Login Failed!";
        console.error(error);
    } else {
        document.getElementById("loginMessage").innerText = "Login Successful!";
        userId = data.user.id;
        getResources();
    }
}

// 📊 Fetch Resources
async function getResources() {
    let { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('user_id', userId);
    if (data) {
        document.getElementById("gold").innerText = data[0].gold;
        document.getElementById("food").innerText = data[0].food;
        document.getElementById("wood").innerText = data[0].wood;
        document.getElementById("stone").innerText = data[0].stone;
    }
}

// 🌙 Collect Resources
async function collectResources() {
    let { error } = await supabase
        .from('resources')
        .update({
            gold: gold + 10,
            food: food + 10,
            wood: wood + 5,
            stone: stone + 5
        })
        .eq('user_id', userId);
    if (!error) getResources();
}

// 🎖 Assign General
async function assignGeneral() {
    const selectedGeneral = document.getElementById("generalSelect").value;
    document.getElementById("currentGeneral").innerText = selectedGeneral.replace(/([A-Z])/g, ' $1');

    const generalImages = {
        eclipseshadow: "assets/eclipseshadow.png",
        celestia: "assets/celestia.png",
        seraphina: "assets/seraphina.png",
        lunanightshade: "assets/lunabightshade.png"
    };

    const generalImage = document.getElementById("generalImage");
    generalImage.src = generalImages[selectedGeneral];
    generalImage.style.display = "block";

    await supabase
        .from('generals')
        .insert([{ user_id: userId, general_name: selectedGeneral }]);
}
